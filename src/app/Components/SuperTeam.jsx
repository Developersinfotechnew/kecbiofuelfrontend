'use client';

import React, { useState, useEffect, useRef } from 'react';
import Ceosuperteam from './Ceosuperteam';

const OrgChartComponent = () => {
    const treeRef = useRef(null);
    const chartRef = useRef(null);
    const sectionRef = useRef(null);
    const statusTimerRef = useRef(null);

    const [scale, setScale] = useState(0.85);
    const [zoomControlsVisible, setZoomControlsVisible] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [statusMessage, setStatusMessage] = useState('Loading...');

    /* ---------------- fade-in on scroll ---------------- */
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setIsVisible(true);
                });
            },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    /* ---------------- status helper ---------------- */
    const updateStatus = (message) => {
        setStatusMessage(message);
        if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
        statusTimerRef.current = setTimeout(() => setStatusMessage('Ready'), 2000);
    };

    /* ---------------- chart data ---------------- */
    const getChartData = () => {
        return [
            // CEO at top
            { id: 1, name: 'JITENDRA NARYAN', title: 'CEO & Founder', tags: ['ceo'], img: '/images/ceo.jpg' },

            // First level departments directly under CEO
            { id: 2, pid: 1, name: 'ADVISOR', tags: ['section'] },
            { id: 3, pid: 1, name: 'EXECUTIVE ASSISTANT', tags: ['section'] },
            { id: 4, pid: 1, name: 'Mr. SUNIL KULSHRESTHA', title: 'CHIEF FINANCE OFFICER', img: '/images/sunil.png' },
            { id: 5, pid: 1, name: 'TECHNOLOGY', tags: ['section'] },
            { id: 6, pid: 1, name: 'CHIEF MARKETING OFFICER', tags: ['section'] },
            { id: 7, pid: 1, name: 'AGRO-INPUTS', tags: ['section'] },

            // Advisor branch
            { id: 20, pid: 2, name: 'Dr. Anshu Gupta', title: 'Founder Sarvodaya Hosp.', img: '/images/anshu.png' },
            { id: 21, pid: 2, name: 'Mr. Ashish Kaushik', title: 'IIM Ahmedabad Advisor', img: '/images/ashish.png' },

            { id: 22, pid: 20, name: 'Mr. Surender Singhal', title: 'Advisor-Chartered Engineer', img: '/images/surender.png' },
            { id: 23, pid: 20, name: 'Mr. Deepak Joshi', title: 'Advisor- Govt.Liaising', img: '/images/deepak.png' },
            { id: 24, pid: 20, name: 'Mr. Vivek Raman', title: 'Advisor Business Strategies', img: '/images/vivek.png' },

            { id: 25, pid: 21, name: 'Mr. P.Dev Anand', title: 'Advisor to KEC - Bio mass', img: '/images/pdev.png' },
            { id: 26, pid: 21, name: 'Mr. Ratheesh Shamrock', title: 'Consultancy(India) U.A.E', img: '/images/ratheesh.png' },
            { id: 27, pid: 21, name: 'Mr. Chinmoy Chakroborty', title: 'Sr. Vice President, Auditor', img: '/images/chinmoy.png' },

            // Executive Assistant branch
            { id: 30, pid: 3, name: 'HUMAN RESOURCE', tags: ['section'] },
            { id: 31, pid: 3, name: 'ADMIN & COORDINATOR', tags: ['section'] },

            { id: 32, pid: 30, name: 'Mrs. Shivani Khantwan', title: 'Human Resource Manager', img: '/images/shivani.png' },
            { id: 33, pid: 30, name: 'Mrs. Suman', title: 'Co-Coordinator', img: '/images/suman.png' },

            { id: 34, pid: 31, name: 'Mr. Ashok Kumar Jaiswal', title: 'Admin & Coordinator', img: '/images/ashok.png' },
            { id: 35, pid: 31, name: 'Mr. S. Kumar', title: 'Admin & Coordinator', img: '/images/skumar.png' },

            // CFO branch
            { id: 41, pid: 4, name: 'Mr. Taanishq Aggarwal', title: 'B.I Manager', img: '/images/tanishq.png' },

            // Technology branch
            { id: 50, pid: 5, name: 'Mr. Sunandan Taneja', title: 'VP Operation Head', img: '/images/sumandan.png' },
            { id: 51, pid: 5, name: 'Mr. Saurabh Bamrara', title: 'Sr. Project Manager', img: '/images/saurabh.png' },
            { id: 52, pid: 5, name: 'Mr. Shivay Singh', title: 'Sr. Project Engineer', img: '/images/shivay.png' },

            // Chief Marketing Officer branch
            { id: 60, pid: 6, name: 'Dr. Khushbu Chaudhary', title: 'Sr.VP, CH CBG, Advisor', img: '/images/khusboo.png' },
            { id: 61, pid: 6, name: 'R & D', tags: ['section'] },
            { id: 62, pid: 6, name: 'PROJECTS', tags: ['section'] },

            { id: 63, pid: 60, name: 'Ms. PAYAL JEE', title: 'EXECUTIVE ASSISTANT', img: '/images/payal.png' },
            { id: 64, pid: 63, name: 'CBG', tags: ['section'] },
            { id: 65, pid: 63, name: 'VP-FRANCHISE -AGRO', tags: ['section'] },

            { id: 66, pid: 64, name: 'VP-B2B', tags: ['section'] },
            { id: 67, pid: 64, name: 'VP-B2C', tags: ['section'] },

            { id: 68, pid: 66, name: 'Mr. Jai Prakash Mandal', title: 'Marketing Manager', img: '/images/jai.png' },
            { id: 69, pid: 66, name: 'Mr. Gangeshwar', title: 'Senior Manager', img: '/images/gangeshwar.png' },

            { id: 72, pid: 67, name: 'Mr. Jayant Priyadarshan', title: 'Sr. VP Sales & Marketing', img: '/images/jayant.png' },
            { id: 73, pid: 67, name: 'Mr. Alok Pandey', title: 'BDM', img: '/images/alok.png' },
            { id: 74, pid: 67, name: 'Mr. Kaushal Kumar', title: 'BDM', img: '/images/kaushal.png' },
            { id: 75, pid: 67, name: 'Ms. Nitiksha', title: 'Asst. Manager Exec.', img: '/images/nitikshasha.png' },

            { id: 76, pid: 65, name: 'Ms. Satyam Sharma', title: 'PD Manager', img: '/images/satyam.png' },
            { id: 77, pid: 65, name: 'Ms. Sunderlal', title: 'AVP International BD', img: '/images/sunderlal.png' },

            { id: 78, pid: 61, name: 'Mr. Manish aswa', title: 'Sr. VP', img: '/images/manish.png' },

            { id: 81, pid: 62, name: 'Mr. Dipesh', title: 'Electric Engineer', img: '/images/dipesh.png' },
            { id: 82, pid: 62, name: 'Mr. Dipanshu', title: 'Civil Engineer', img: '/images/dipansh.png' },

            // Agro-Inputs branch
            { id: 94, pid: 7, name: 'GOVERNMENT INSTITUTION PPP', tags: ['section'] },

            { id: 95, pid: 94, name: 'Mr. Sachin Bisht', title: 'Senior Project Manager', img: '/images/sachin.png' },
            { id: 96, pid: 94, name: 'Mr. Hirender Nahar', title: 'VP', img: '/images/hitender.png' },
            { id: 97, pid: 94, name: 'Mr. Virender Nirmesh', title: 'AVP Intl.Marketing & Sales', img: '/images/virender.png' },
        ];
    };

    /* ---------------- load lib + init chart ---------------- */
    useEffect(() => {
        let cancelled = false;

        const initializeChart = () => {
            if (cancelled || !window.OrgChart || !treeRef.current) return;
            if (chartRef.current) return; // guard React StrictMode double-mount

            try {
                const OrgChart = window.OrgChart;

                /* ----- person template ----- */
                OrgChart.templates.myTemplate = Object.assign({}, OrgChart.templates.ana);
                OrgChart.templates.myTemplate.size = [290, 80];
                OrgChart.templates.myTemplate.node =
                    `<rect x="0" y="0" height="80" width="290" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="12" ry="12"></rect>
                     <line x1="0" y1="35" x2="290" y2="35" stroke="#1976d2" stroke-width="1"></line>`;

                OrgChart.templates.myTemplate.field_0 =
                    `<text width="200" style="font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600; fill: #1565c0;" x="170" y="22" text-anchor="middle">{val}</text>`;

                OrgChart.templates.myTemplate.field_1 =
                    `<text width="200" style="font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600; fill: #424242;" x="170" y="55" text-anchor="middle">{val}</text>`;

                OrgChart.templates.myTemplate.img_0 =
                    '<clipPath id="{randId}"><circle cx="40" cy="40" r="30"></circle></clipPath>' +
                    '<image xlink:href="{val}" x="-22" y="10" width="120" height="100" clip-path="url(#{randId})"></image>';

                /* ----- CEO template ----- */
                OrgChart.templates.ceoTemplate = Object.assign({}, OrgChart.templates.myTemplate);
                OrgChart.templates.ceoTemplate.size = [350, 100];
                OrgChart.templates.ceoTemplate.node =
                    `<rect x="0" y="0" height="100" width="350" fill="#189AB4" stroke="#05445E" stroke-width="3" rx="15" ry="15"></rect>
                     <line x1="0" y1="45" x2="350" y2="45" stroke="#0d47a1" stroke-width="2"></line>`;

                OrgChart.templates.ceoTemplate.field_0 =
                    `<text width="250" style="font-family: 'Inter', sans-serif; font-size: 22px; font-weight: 700; fill: white;" x="200" y="30" text-anchor="middle">{val}</text>`;

                OrgChart.templates.ceoTemplate.field_1 =
                    `<text width="250" style="font-family: 'Inter', sans-serif; font-size: 22px; font-weight: 700; fill: #e3f2fd;" x="200" y="70" text-anchor="middle">{val}</text>`;

                OrgChart.templates.ceoTemplate.img_0 =
                    '<clipPath id="{randId}"><circle cx="50" cy="50" r="35"></circle></clipPath>' +
                    '<image xlink:href="{val}" x="15" y="10" width="70" height="105" clip-path="url(#{randId})"></image>';

                /* ----- section template ----- */
                OrgChart.templates.sectionTemplate = Object.assign({}, OrgChart.templates.ana);
                OrgChart.templates.sectionTemplate.size = [250, 50];
                OrgChart.templates.sectionTemplate.node =
                    `<rect x="0" y="0" height="50" width="250" fill="#bbdefb" stroke="#1976d2" stroke-width="2" rx="10" ry="10"></rect>`;
                OrgChart.templates.sectionTemplate.field_0 =
                    `<text width="250" style="font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 600; fill: #1565c0;" x="125" y="28" text-anchor="middle">{val}</text>`;

                chartRef.current = new OrgChart(treeRef.current, {
                    scaleInitial: 0.6,
                    backgroundColor: 'transparent',
                    mouseScrool: OrgChart.action.zoom,
                    enableSearch: false,
                    template: 'myTemplate',
                    enableDragDrop: false,
                    layout: OrgChart.tree, // swap to OrgChart.mixed for a much narrower tree
                    orientation: OrgChart.orientation.top,
                    siblingSeparation: 30,
                    levelSeparation: 60,
                    scaleMin: 0.05,
                    scaleMax: 5,
                    nodeBinding: {
                        field_0: 'name',
                        field_1: 'title',
                        img_0: 'img',
                    },
                    tags: {
                        ceo: { template: 'ceoTemplate' },
                        section: { template: 'sectionTemplate' },
                    },
                });

                chartRef.current.on('ready', function () {
                    updateStatus('Chart Ready');
                    // delay fit — box not laid out yet the instant 'ready' fires
                    setTimeout(() => {
                        if (!chartRef.current) return;
                        chartRef.current.fit();
                        const s = chartRef.current.config.scale;
                        if (typeof s === 'number' && !Number.isNaN(s)) setScale(s);
                    }, 400);
                });

                // keep the % badge in sync with wheel-zoom / pinch
                chartRef.current.on('redraw', function () {
                    const s = chartRef.current?.config?.scale;
                    if (typeof s === 'number' && !Number.isNaN(s)) setScale(s);
                });

                chartRef.current.load(getChartData());
            } catch (error) {
                console.error('Error initializing chart:', error);
                updateStatus('Error Loading Chart');
            }
        };

        const existing = document.querySelector('script[data-orgchart="true"]');
        if (window.OrgChart) {
            initializeChart();
        } else if (existing) {
            existing.addEventListener('load', initializeChart);
        } else {
            const script = document.createElement('script');
            script.src = 'https://balkan.app/js/OrgChart.js';
            script.async = true;
            script.dataset.orgchart = 'true';
            script.onload = initializeChart;
            document.head.appendChild(script);
        }

        return () => {
            cancelled = true;
            if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
            try {
                if (chartRef.current && typeof chartRef.current.destroy === 'function') {
                    chartRef.current.destroy();
                }
            } catch (e) {
                // older lib build has no destroy() — ignore
            }
            // always wipe the mount node: stray SVG left behind (StrictMode
            // double-mount, or a lib version without destroy()) renders as a
            // blank white box on top of / instead of the real chart
            if (treeRef.current) treeRef.current.innerHTML = '';
            chartRef.current = null;
        };
    }, []);

    /* ---------------- refit on window resize ---------------- */
    useEffect(() => {
        const onResize = () => {
            if (chartRef.current) {
                chartRef.current.fit();
                setScale(chartRef.current.config.scale);
            }
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    /* ---------------- zoom controls (native OrgChart API) ---------------- */
    const performZoom = (direction) => {
        const chart = chartRef.current;
        if (!chart) return;

        if (direction === 'in') chart.zoom(true);
        else if (direction === 'out') chart.zoom(false);
        else if (direction === 'fit') chart.fit();
        else if (direction === 'overview') chart.zoom(0.35, null, true);
        else if (direction === 'reset') chart.zoom(1, null, true);

        setScale(chart.config.scale);
        updateStatus(`Zoom: ${direction}`);
    };

    return (
        <div
            ref={sectionRef}
            /* FIX: min-h-screen, not h-screen — section grows with its content */
            className="min-h-screen flex flex-col transition-opacity duration-1000 ease-out"
            style={{
                background: 'linear-gradient(135deg, #ffffffff 0%, #a6d8bdff 100%)',
                opacity: isVisible ? 1 : 0,
            }}
        >
            {/* CEO Info Section */}
            <Ceosuperteam />

            {/* Main Chart Container */}
            <div className="w-full px-4 pb-16 relative">
                <div
                    className="w-full border-2 border-white rounded-2xl shadow-2xl relative overflow-hidden"
                    style={{
                        /* FIX: explicit height. OrgChart needs a sized parent, and no CSS scale() */
                        height: '80vh',
                        minHeight: '600px',
                        background: 'linear-gradient(135deg, #065f46 0%, #059669 50%, #10b981 100%)',
                    }}
                >
                    <div ref={treeRef} style={{ width: '100%', height: '100%' }}></div>
                </div>
            </div>

            {/* Zoom Controls */}
            {zoomControlsVisible && (
                <div className="fixed top-24 right-5 bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-4 shadow-xl z-50 flex flex-col gap-3 border border-white border-opacity-20">
                    <button
                        onClick={() => setZoomControlsVisible(false)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                    >
                        ×
                    </button>

                    <button
                        onClick={() => performZoom('in')}
                        className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:shadow-lg hover:-translate-y-0.5 transition-all min-w-20"
                    >
                        Zoom In
                    </button>

                    <button
                        onClick={() => performZoom('out')}
                        className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:shadow-lg hover:-translate-y-0.5 transition-all min-w-20"
                    >
                        Zoom Out
                    </button>

                    <div className="bg-gray-100 px-3 py-2 rounded-lg text-center font-semibold text-gray-800 text-sm border">
                        {Math.round(scale * 100)}%
                    </div>

                    <button
                        onClick={() => performZoom('fit')}
                        className="bg-gradient-to-r from-red-400 to-orange-500 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:shadow-lg hover:-translate-y-0.5 transition-all min-w-20"
                    >
                        Fit Screen
                    </button>

                    <button
                        onClick={() => performZoom('overview')}
                        className="bg-gradient-to-r from-teal-400 to-green-500 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:shadow-lg hover:-translate-y-0.5 transition-all min-w-20"
                    >
                        Overview
                    </button>

                    <button
                        onClick={() => performZoom('reset')}
                        className="bg-gradient-to-r from-blue-200 to-pink-200 text-gray-800 px-4 py-2 rounded-lg font-semibold text-sm hover:shadow-lg hover:-translate-y-0.5 transition-all min-w-20"
                    >
                        Reset
                    </button>

                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-lg text-center text-xs font-medium border border-green-200">
                        {statusMessage}
                    </div>
                </div>
            )}

            {/* Toggle Controls Button */}
            {!zoomControlsVisible && (
                <button
                    onClick={() => setZoomControlsVisible(true)}
                    className="fixed top-20 right-5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-2xl w-12 h-12 flex items-center justify-center text-xl z-50 shadow-xl hover:scale-110 transition-transform"
                >
                    ☰
                </button>
            )}
        </div>
    );
};

export default OrgChartComponent;