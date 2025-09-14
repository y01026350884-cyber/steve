'use client';

import HeroSection from './mainpage_components/HeroSection';
import CompanyAccordion from './mainpage_components/CompanyAccordion';
import ServicesAccordion from "./mainpage_components/ServicesAccordion";

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* ✅ Hero Section */}
      <HeroSection />

      {/* ✅ Company Section (mt-0으로 여백 제거) */}
      <section className="mt-0">
        <CompanyAccordion />
      </section>

      {/* ✅ Services Section */}
      <section className="mt-0">
        <ServicesAccordion />
      </section>

      {/* ✅ Contact Section (필요하면 주석 해제) */}
      {/* <section className="h-screen mt-0">
        <ContactBox />
      </section> */}
    </main>
  );
}
