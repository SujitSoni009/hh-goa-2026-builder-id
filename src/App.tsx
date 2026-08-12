/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { GeneratorPage } from './components/GeneratorPage';
import { VerifyPage } from './components/VerifyPage';
import { FormatType } from './types';

function MainApp() {
  const [format, setFormat] = useState<FormatType>(null);

  if (format) {
    return <GeneratorPage format={format} onSelectFormat={setFormat} />;
  }

  return <LandingPage onSelectFormat={setFormat} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/verify/:id" element={<VerifyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

