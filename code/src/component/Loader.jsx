import React from 'react';

const Loader = () => {
  return (
    <div className="relative flex items-center justify-center w-full h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-200/20 to-transparent rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-200/20 to-transparent rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
      </div>

      {/* Container with glass effect */}
      <div className="relative px-8 py-12 bg-white/30 backdrop-blur-lg rounded-3xl shadow-xl">
        {/* Loading text */}
        <h1 className="text-2xl font-semibold text-center mb-8 text-emerald-800/80">
          Loading...
        </h1>

        {/* Loader animation */}
        <div className="loader relative flex items-center justify-center gap-4 h-40 w-64 overflow-hidden">
          {/* Love Container */}
          <div className="container-love w-full flex flex-col h-52 relative items-center">
            <div className="carousel flex flex-col gap-4 absolute w-full">
              {[...Array(7)].map((_, i) => (
                <div key={`love-${i}`} className="love">
                  <div className="love-inner" />
                  <div className="love-before" />
                  <div className="love-after" />
                </div>
              ))}
            </div>
          </div>

          {/* Plus Sign Container */}
          <div className="container-plus w-full flex flex-col h-52 relative items-center">
            <div className="carousel flex flex-col gap-4 absolute w-full">
              {[...Array(7)].map((_, i) => (
                <div key={`plus-${i}`} className="plus" />
              ))}
            </div>
          </div>

          {/* Right Hearts Container */}
          <div className="container-hearts w-full flex flex-col h-52 relative items-center">
            <div className="carousel flex flex-col gap-4 absolute w-full">
              {[...Array(7)].map((_, i) => (
                <div key={`right-heart-${i}`} className="right-heart">
                  <div className="right-heart-inner" />
                  <div className="right-heart-before" />
                  <div className="right-heart-after" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          .loader {
            display: flex;
            position: relative;
            justify-items: center;
            align-items: center;
            gap: 1rem;
            height: 55px;
            width: 280px;
            overflow: hidden;
          }

          .container-love, .container-plus, .container-hearts {
            width: 100%;
            display: flex;
            flex-direction: column;
            height: 200px;
            position: relative;
            align-items: center;
          }

          .container-hearts {
            justify-content: flex-start;
            animation: scroll-up 4s infinite ease-in-out;
            animation-delay: 3s;
          }

          .container-plus {
            justify-content: flex-end;
            animation: scroll-down 4s infinite ease-in-out;
            animation-delay: 3s;
            width: 140%;
          }

          .container-love {
            justify-content: flex-end;
            animation: scroll-down 3s infinite ease-in-out;
            animation-delay: 3s;
          }

          .love, .right-heart {
            background: linear-gradient(135deg, #00f260 0%, #0575e6 100%);
            display: flex;
            width: 30px;
            height: 30px;
            position: relative;
            align-items: center;
            justify-content: center;
            left: 8px;
            margin: 0.8rem 4px;
            transform: rotate(45deg);
          }

          .love::before, .love::after,
          .right-heart::before, .right-heart::after {
            content: '';
            position: absolute;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: linear-gradient(135deg, #00f260 0%, #0575e6 100%);
          }

          .love::before, .right-heart::before {
            left: -16px;
          }

          .love::after, .right-heart::after {
            top: -16px;
          }

          .plus {
            display: flex;
            width: 100%;
            height: 55px;
            position: relative;
            align-items: center;
            justify-content: center;
            animation: rotation 3s infinite ease-in-out;
            animation-delay: 1s;
            scale: 1.5;
          }

          .plus:after {
            content: '';
            height: 50px;
            width: 14px;
            position: absolute;
            background: linear-gradient(to bottom, #00f260 0%, #0575e6 100%);
            border-radius: 6px;
          }

          .plus:before {
            content: '';
            height: 14px;
            width: 50px;
            position: absolute;
            background: linear-gradient(to right, #00f260 0%, #0575e6 100%);
            border-radius: 6px;
          }

          @keyframes scroll-up {
            0% {
              transform: translateY(0);
              filter: blur(0);
            }
            30% {
              transform: translateY(-150%);
              filter: blur(10px);
            }
            60% {
              transform: translateY(0);
              filter: blur(0px);
            }
          }

          @keyframes scroll-down {
            0% {
              transform: translateY(0);
              filter: blur(0);
            }
            30% {
              transform: translateY(150%);
              filter: blur(10px);
            }
            60% {
              transform: translateY(0);
              filter: blur(0px);
            }
          }

          @keyframes rotation {
            20%, 100% {
              transform: rotate(180deg);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Loader;