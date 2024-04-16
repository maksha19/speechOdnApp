// ActivityScreen.tsx
import React, { useState, useEffect } from 'react';
import { FaMicrophone, FaStopCircle } from 'react-icons/fa';
import useSpeechToText from 'react-hook-speech-to-text';
import axios from 'axios';

async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const ActivityScreen: React.FC = () => {
    const [backendResponse, setBackendResponse] = useState<any | null>(null); // Adjust type as per your backend response
    const [startTime, setStartTime] = useState<number | null>(null);
    const [timer, setTimer] = useState<number>(0);
    const [recordingtext, setRecordingText] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [elapsedTime, setElapsedTime] = useState<number | null>(null)
    const reference_transcription = 'Starting the day early allows students to make the most of their learning potential. Research suggests that cognitive functions are often at their peak in the morning, making it an optimal time for studying and retaining information'

    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false,
        speechRecognitionProperties: { interimResults: true }
    });

    useEffect(() => {
        let interval: any;
        if (isRecording) {
            // Start the timer
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1);
            }, 1000);
        } else {
            // Clear the timer when recording is stopped
            clearInterval(interval);
            setTimer(0);
        }

        return () => clearInterval(interval);
    }, [isRecording]);

    const submitForAnalysis = async (elapsedTime: number, text: string) => {
        setIsSubmitted(true)
        const result = await axios.post('http://0.0.0.0:8080/invocations',
            {
                reference_transcription,
                text,
                duration: elapsedTime
            })
        console.log('analysis report', result.data)
        setBackendResponse(result.data)
        setIsSubmitted(false)
    }

    const onRecordingVoice = async (type: string) => {
        if (type === 'START') {
            setTimeout(() => {
                startSpeechToText()
                setStartTime(Date.now());
                setBackendResponse(null)
                setRecordingText('')
                setResults([])
            }, 0)

        } else if (type === 'STOP') {
            stopSpeechToText()
            await sleep(500)
            let interimText = interimResult
            const duration = startTime && Math.floor((Date.now() - startTime) / 1000)
            if (!interimText && startTime) {
                console.log('results', results)
                interimText = results.map((result: any) => {
                    if (startTime > result.timestamp) {
                        return result.transcript
                    }
                    return null
                }).join(" ")
            }
            console.log("interimText", interimText)
            if (!interimText) {
                interimText = 'Please try again'
                setRecordingText(interimText)
                return
            }
            if (!duration) {
                interimText = 'Please try again'
                setRecordingText(interimText)
                return
            }
            console.log('speech', interimText)
            console.log('duration', duration)
            setElapsedTime(duration)
            setRecordingText(interimText)
            submitForAnalysis(duration, interimText)
        }
    }

    if (error) return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-lg">
                <p>Web Speech API is not available in this browser 🤷‍. Please try in Google Chrome </p>
            </div>
        </div>
    )

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-lg">
                <div className="bg-[#ffc0cb] rounded-lg shadow-md p-4">

                    <h2 className="text-xl font-semibold mb-2">Reference Text</h2>
                    <h2 className="text-xl font-semibold mb-2">{reference_transcription}</h2>


                    <div className=" mt-4">
                        {isRecording ? (
                            <div className="grid grid-cols-12 ">
                                <div className="col-start-6 ml-5">
                                    <button onClick={() => onRecordingVoice('STOP')} className="text-red-500 hover:text-red-600 focus:outline-none">
                                        <FaStopCircle className="w-8 h-8" />
                                    </button>
                                </div>
                                <div className="col-start-4 col-span-5 ml-5">
                                    <div className="text-center">
                                        <progress className="progress w-56" value={timer} max="120"></progress>
                                    </div>
                                </div>

                            </div>
                        ) : (
                            <div className="grid grid-cols-12 ">
                                <div className="col-start-6 ml-5">
                                    <button onClick={() => onRecordingVoice('START')} className="text-blue-500 hover:text-blue-600 focus:outline-none">
                                        <FaMicrophone className="w-8 h-8" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">Transcription</h3>
                        <ul>
                            {recordingtext}
                        </ul>
                    </div>

                    {
                        isSubmitted &&
                        <div className="flex min-h-[6rem] min-w-[18rem] max-w-4xl flex-wrap items-center justify-center gap-2 overflow-x-hidden bg-cover bg-top p-4 [border-width:var(--tab-border)] undefined">
                            <h2 >Analysing...</h2>
                            <span className="loading loading-infinity loading-xs"></span>
                            <span className="loading loading-infinity loading-sm"></span>
                            <span className="loading loading-infinity loading-md"></span>
                            <span className="loading loading-infinity loading-lg"></span>
                        </div>
                    }
                    {
                        backendResponse && (
                            <>
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold mb-2">Your Speech Report</h3>
                                    <p>Grammar Score: {parseFloat(backendResponse.grammar_score).toFixed(2)}</p>
                                    <p>Pronunciation Score: {parseFloat(backendResponse.pronunciation_score).toFixed(2)}</p>
                                    <p>Speech Rate: {parseFloat(backendResponse.speech_rate).toFixed(2)} words per second</p>
                                    <p>Total taken seconds: {elapsedTime}</p>
                                </div>
                            </>
                        )
                    }
                </div>
                <div className="carousel w-full">
                    <div id="item1" className="carousel-item w-full">
                        <img src="https://daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg" className="w-full" />
                    </div>
                    <div id="item2" className="carousel-item w-full">
                        <img src="https://daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg" className="w-full" />
                    </div>
                    <div id="item3" className="carousel-item w-full">
                        <img src="https://daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg" className="w-full" />
                    </div>
                    <div id="item4" className="carousel-item w-full">
                        <img src="https://daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg" className="w-full" />
                    </div>
                </div>
                <div className="flex justify-center w-full py-2 gap-2">
                    <a href="#item1" className="btn btn-xs">1</a>
                    <a href="#item2" className="btn btn-xs">2</a>
                    <a href="#item3" className="btn btn-xs">3</a>
                    <a href="#item4" className="btn btn-xs">4</a>
                </div>

            </div>
        </div>
    );
}

export default ActivityScreen;
