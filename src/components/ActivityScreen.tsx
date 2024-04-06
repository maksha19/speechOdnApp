// ActivityScreen.tsx
import React, { useState } from 'react';
import { FaMicrophone, FaStopCircle } from 'react-icons/fa';
import useSpeechToText from 'react-hook-speech-to-text';

const ActivityScreen: React.FC = () => {
    const [backendResponse] = useState<any | null>(null); // Adjust type as per your backend response

    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });


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
                <div className="bg-white rounded-lg shadow-md p-4">
                    {/* Question */}
                    <h2 className="text-xl font-semibold mb-2">Question</h2>
                    {/* Answer */}
                    <p>{/* Placeholder for answer */}</p>
                    {/* Recording/Microphone button */}
                    <div className="flex justify-center items-center mt-4">
                        <h1>Recording: {isRecording.toString()}</h1>
                        {isRecording ? (
                            <button onClick={stopSpeechToText} className="text-red-500 hover:text-red-600 focus:outline-none">
                                <FaStopCircle className="w-8 h-8" />
                            </button>
                        ) : (
                            <button onClick={startSpeechToText} className="text-blue-500 hover:text-blue-600 focus:outline-none">
                                <FaMicrophone className="w-8 h-8" />
                            </button>
                        )}
                    </div>
                    {/* Transcription */}
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">Transcription</h3>
                        <ul>
                            {results.map((result: any) => (
                                <li key={result.timestamp}>{result.transcript}</li>
                            ))}
                            {interimResult && <li>{interimResult}</li>}
                        </ul>
                    </div>
                    {/* Result */}
                    {backendResponse && (
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold mb-2">backendResponse</h3>
                            <p>Grammar Score: {backendResponse.grammar_score}</p>
                            <p>Pronunciation Score: {backendResponse.pronunciation_score}</p>
                            <p>Speech Rate: {backendResponse.speech_rate}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ActivityScreen;
