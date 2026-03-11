/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Mantra from './pages/Mantra';
import GayatriMantra from './pages/GayatriMantra';
import BeejMantras from './pages/BeejMantras';
import Lingashtakam from './pages/Lingashtakam';
import DeityHub from './pages/DeityHub';
import EternalGyan from './pages/EternalGyan';
import Shop from './pages/Shop';
import Scriptures from './pages/Scriptures';
import Mantras from './pages/Mantras';
import Temples from './pages/Temples';
import Meditate from './pages/Meditate';
import Feedback from './pages/Feedback';
import Listen from './pages/Listen';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="mantras" element={<Mantras />} />
          <Route path="mantras/gayatri-mantra" element={<GayatriMantra />} />
          <Route path="mantras/beej-mantras" element={<BeejMantras />} />
          <Route path="mantras/lingashtakam" element={<Lingashtakam />} />
          <Route path="mantras/:id" element={<Mantra />} />
          <Route path="deities/:id" element={<DeityHub />} />
          <Route path="eternal-gyan" element={<EternalGyan />} />
          <Route path="shop" element={<Shop />} />
          <Route path="shop/:id" element={<Shop />} />
          <Route path="scriptures" element={<Scriptures />} />
          <Route path="scriptures/:id" element={<Scriptures />} />
          <Route path="temples" element={<Temples />} />
          <Route path="temples/:id" element={<Temples />} />
          <Route path="meditate" element={<Meditate />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="listen" element={<Listen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
