// HomePage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const goToActivityScreen = () => {
        navigate('/activity')
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col mt-20  w-10/12 space-y-4">
                {/* Card 1: Storytelling */}
                <div className="bg-orange-400 flex flex-col justify-center items-center rounded-lg shadow-md p-4" onClick={() => goToActivityScreen()}>
                    <h3 className="text-lg font-semibold mb-2">Storytelling</h3>
                    <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                {/* Card 2: Debate */}
                <div className="bg-orange-400 flex flex-col justify-center items-center rounded-lg shadow-md p-4" onClick={() => goToActivityScreen()}>
                    <h3 className="text-lg font-semibold mb-2">Debate</h3>
                    <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

                </div>

                {/* Card 3: MUET */}
                <div className="bg-orange-400 flex flex-col justify-center items-center rounded-lg shadow-md p-4" onClick={() => goToActivityScreen()}>
                    <h3 className="text-lg font-semibold ">MUET</h3>
                    <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

                </div>

                {/* Card 4: Random */}
                <div className="bg-orange-400 flex flex-col justify-center items-center rounded-lg shadow-md p-4">
                    <h3 className="text-lg font-semibold ">Random</h3>
                    <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

                </div>
            </div>
        </div>
    );
}

export default HomePage;
