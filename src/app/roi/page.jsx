'use client';

import { useState } from 'react';
import RoiForm from '../../app/Components/RoiForm';
import KecBioPulseAI from '../Components/CbgRoiCalculator';
// import KecBioPulseAI from '../../app/Components/KecBioPulseAI';

export default function RoiPage() {
    const [showRoi, setShowRoi] = useState(false);
    return showRoi
        ? <KecBioPulseAI />
        : <RoiForm onSuccess={() => setShowRoi(true)} />;
}