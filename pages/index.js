// pages/index.js
import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { gsap } from 'gsap';

export default function Home() {
  const [activeForm, setActiveForm] = useState(null);

  // Refs for animations
  const headerRef = useRef(null);
  const taglineRef = useRef(null);
  const descriptionRef = useRef(null);
  const loginSectionRef = useRef(null);
  const doctorFormRef = useRef(null);
  const patientFormRef = useRef(null);
  const backgroundShapesRef = useRef(null);
  const footerRef = useRef(null);
  const doctorRef = useRef(null);
  const patientRef = useRef(null);

  useEffect(() => {
    // GSAP animations
    const timeline = gsap.timeline();

    // Animate elements in sequence
    timeline
      .from(backgroundShapesRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 1.2,
        ease: "power2.out"
      })
      .from(headerRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.7")
      .from(taglineRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.5")
      .from(descriptionRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4")
      .from(loginSectionRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.7,
        ease: "back.out(1.7)"
      }, "-=0.3")
      .from([doctorRef.current, patientRef.current], {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.6,
        ease: "power1.out"
      }, "-=0.2")
      .from(footerRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.5,
        ease: "power1.out"
      }, "-=0.3");

    // Enhanced button hover animations
    const buttons = document.querySelectorAll('.role-btn');
    buttons.forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        gsap.to(btn, {
          scale: 1.05,
          boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.3)",
          duration: 0.3,
          ease: "power1.out"
        });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          scale: 1,
          boxShadow: "0 4px 15px -3px rgba(59, 130, 246, 0.2)",
          duration: 0.3,
          ease: "power1.out"
        });
      });
    });

    // Hide login forms initially
    gsap.set([doctorFormRef.current, patientFormRef.current], { autoAlpha: 0 });

    // Form input animations
    const formInputs = document.querySelectorAll('input');
    formInputs.forEach(input => {
      input.addEventListener('focus', () => {
        gsap.to(input, {
          borderColor: '#3b82f6',
          duration: 0.3
        });
      });

      input.addEventListener('blur', () => {
        if (!input.value) {
          gsap.to(input, {
            borderColor: '#d1d5db',
            duration: 0.3
          });
        }
      });
    });
  }, []);

  // Handle role selection
  const handleRoleSelection = (role) => {
    setActiveForm(role);

    if (role === 'doctor') {
      gsap.to(doctorFormRef.current, {
        autoAlpha: 1,
        display: 'block',
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      });
      gsap.to(patientFormRef.current, {
        autoAlpha: 0,
        display: 'none',
        duration: 0.3,
        ease: "power2.in"
      });
    } else {
      gsap.to(patientFormRef.current, {
        autoAlpha: 1,
        display: 'block',
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      });
      gsap.to(doctorFormRef.current, {
        autoAlpha: 0,
        display: 'none',
        duration: 0.3,
        ease: "power2.in"
      });
    }
  };

  return (
    <>
      <Head>
        <title>Swajarnika - Advanced Healthcare Platform</title>
        <meta name="description" content="Advanced healthcare platform connecting doctors and patients with secure telemedicine solutions" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
      </Head>

      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js" strategy="beforeInteractive" />

      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 font-['Poppins'] text-gray-800 flex items-center justify-center p-4 overflow-hidden relative">
        {/* Subtle background shapes */}
        <div ref={backgroundShapesRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-blue-200 opacity-20"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-sky-200 opacity-20"></div>
          <div className="absolute top-40 right-40 w-40 h-40 rounded-full bg-indigo-200 opacity-20"></div>
          <div className="absolute bottom-40 left-40 w-56 h-56 rounded-full bg-blue-100 opacity-20"></div>
        </div>

        <main className="w-full max-w-4xl mx-auto z-10">
          <section className="text-center mb-12">
            <h1
              ref={headerRef}
              className="text-5xl md:text-6xl font-bold mb-4 text-blue-600 tracking-wide"
            >
              Swajarnika
            </h1>
            <div
              ref={taglineRef}
              className="mb-6"
            >
              <p className="text-xl md:text-2xl font-medium text-blue-500">
                The Future of Healthcare
              </p>
            </div>
            <div
              ref={descriptionRef}
              className="max-w-2xl mx-auto"
            >
              <p className="text-lg text-gray-600 leading-relaxed">
                Empowering healthcare through seamless connectivity between doctors and patients.
                Our platform provides advanced telemedicine solutions with secure communication,
                appointment scheduling, and comprehensive health records management.
              </p>
            </div>
          </section>

          <section
            ref={loginSectionRef}
            className="bg-white rounded-xl p-8 md:p-10 border border-gray-200 shadow-xl relative overflow-hidden"
          >
            {/* Subtle accent borders */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-30"></div>

            <h2 className="text-2xl font-semibold text-center mb-8 text-black">
              <span className="inline-block relative">
                LOGIN AS
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></span>
              </span>
            </h2>

            <div className="flex flex-col md:flex-row justify-center gap-6 mb-10">
              <button
                ref={doctorRef}
                className={`role-btn py-3.5 px-8 rounded-lg text-lg font-medium  ${activeForm === 'doctor'
                    ? 'bg-blue-500 text-black'
                    : 'bg-gray-100 text-black'
                  }`}
                onClick={() => handleRoleSelection('doctor')}
              >
                Doctor
              </button>
              <button
                ref={patientRef}
                className={`role-btn py-3.5 px-8 rounded-lg text-lg font-medium  ${activeForm === 'patient'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                onClick={() => handleRoleSelection('patient')}
              >
                Patient
              </button>
            </div>

            <div className="relative min-h-[480px]">
              <div
                ref={doctorFormRef}
                className="absolute top-0 left-0 w-full bg-white rounded-xl p-6 md:p-8 shadow-md border border-gray-200"
              >
                <h3 className="text-xl font-medium text-center mb-6 text-blue-600">
                  <span className="relative">
                    Doctor Login
                    <span className="absolute -bottom-1 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></span>
                  </span>
                </h3>
                <form className="space-y-6">
                  <div>
                    <label
                      htmlFor="doctorUsername"
                      className="block mb-2 font-medium text-gray-700"
                    >
                      Username
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="doctorUsername"
                        name="username"
                        required
                        className="w-full pl-10 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter username"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="doctorPassword"
                      className="block mb-2 font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                        </svg>
                      </div>
                      <input
                        type="password"
                        id="doctorPassword"
                        name="password"
                        required
                        className="w-full pl-10 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter password"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input id="doctorRemember" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                      <label htmlFor="doctorRemember" className="ml-2 text-sm text-gray-600">Remember me</label>
                    </div>
                    
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-md transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    Sign In
                  </button>
                  <div className="text-center mt-4">
                    <p className="text-gray-600 text-sm">
                      No account?{" "}
                      <a href="#" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                        Register now
                      </a>
                    </p>
                  </div>
                </form>
              </div>

              <div
                ref={patientFormRef}
                className="absolute top-0 left-0 w-full bg-white rounded-xl p-6 md:p-8 shadow-md border border-gray-200"
              >
                <h3 className="text-xl font-medium text-center mb-6 text-blue-600">
                  <span className="relative">
                    Patient Login
                    <span className="absolute -bottom-1 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></span>
                  </span>
                </h3>
                <form className="space-y-6">
                  <div>
                    <label
                      htmlFor="patientUsername"
                      className="block mb-2 font-medium text-black"
                    >
                      Username
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="patientUsername"
                        name="username"
                        required
                        className="w-full pl-10 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter username"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="patientPassword"
                      className="block mb-2 font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                        </svg>
                      </div>
                      <input
                        type="password"
                        id="patientPassword"
                        name="password"
                        required
                        className="w-full pl-10 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter password"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input id="patientRemember" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                      <label htmlFor="patientRemember" className="ml-2 text-sm text-gray-600">Remember me</label>
                    </div>
                    <a href="#" className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
                      Forgot password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-md transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    Sign In
                  </button>
                  <div className="text-center mt-4">
                    <p className="text-gray-600 text-sm">
                      No account?{" "}
                      <a href="#" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                        Register now
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </section>

          <footer ref={footerRef} className="mt-12 text-center">
            <div className="text-gray-600 text-sm mb-2">
              © 2025 Swajarnika. All rights reserved.
            </div>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <span className="sr-only">Privacy Policy</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd"></path>
                  <path fillRule="evenodd" d="M10 6a1 1 0 011 1v3a1 1 0 11-2 0V7a1 1 0 011-1z" clipRule="evenodd"></path>
                  <path fillRule="evenodd" d="M10 12a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <span className="sr-only">Terms of Service</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2-2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6z" clipRule="evenodd"></path>
                  <path fillRule="evenodd" d="M7 5h6a1 1 0 010 2H7a1 1 0 110-2zm0 4h6a1 1 0 010 2H7a1 1 0 110-2zm0 4h6a1 1 0 010 2H7a1 1 0 110-2z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <span className="sr-only">Contact Us</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
              </a>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}