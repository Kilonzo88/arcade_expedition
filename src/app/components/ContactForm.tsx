"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, ContactFormData, submitContactForm } from "@/app/contact/actions";

const journeyOptions = [
  { value: "namibia", label: "Namibia" },
  { value: "rwanda-uganda", label: "Rwanda & Uganda" },
  { value: "kenya-tanzania", label: "Kenya & Tanzania" },
  { value: "bespoke", label: "A bespoke journey (not listed)" },
];

export default function ContactForm() {
  const searchParams = useSearchParams();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      journey: "",
      noExactDates: false,
      startDate: "",
      endDate: "",
      flexibleDatesText: "",
      message: "",
      company: "",
    },
  });

  const noExactDates = watch("noExactDates");

  // Pre-fill journey of interest from URL query param e.g. /contact?journey=namibia
  useEffect(() => {
    const journeyParam = searchParams.get("journey");
    if (journeyParam) {
      const match = journeyOptions.find(
        (opt) =>
          opt.value.toLowerCase() === journeyParam.toLowerCase() ||
          opt.label.toLowerCase().includes(journeyParam.toLowerCase())
      );
      if (match) {
        setValue("journey", match.label);
      }
    }
  }, [searchParams, setValue]);

  const onSubmit = async (data: ContactFormData) => {
    setServerError(null);
    const res = await submitContactForm(data);
    if (res.success) {
      setIsSuccess(true);
    } else {
      setServerError(res.error || "An error occurred while submitting your inquiry.");
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-[#FAF7F0] border border-[#C89A4B]/30 rounded-md p-8 text-center my-4 animate-fade-in">
        <div className="w-12 h-12 rounded-full bg-[#C89A4B]/10 text-[#C89A4B] flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display italic text-2xl text-[#16140F] mb-2">
          Thank you
        </h3>
        <p className="font-sans text-sm text-[#5b5140] leading-relaxed max-w-md mx-auto">
          We&rsquo;ve received your inquiry and we&rsquo;ll be in touch within 24 hours to help craft your expedition.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 text-left max-w-[640px] mx-auto"
      noValidate
    >
      {/* Honeypot field (hidden from real users) */}
      <input
        type="text"
        {...register("company")}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {/* 1. Full Name */}
      <div>
        <label className="block font-sans text-xs uppercase tracking-wider text-[#16140F] mb-1.5 font-medium">
          Full Name <span className="text-[#C89A4B]">*</span>
        </label>
        <input
          type="text"
          placeholder="e.g. Eleanor Vance"
          {...register("fullName")}
          className={`w-full bg-[#FAF7F0] border ${
            errors.fullName ? "border-red-500" : "border-[#16140F]/15"
          } rounded-[3px] px-3.5 py-2.5 text-sm text-[#16140F] placeholder-[#8a7a5f]/60 focus:outline-none focus:border-[#C89A4B] transition-colors`}
        />
        {errors.fullName && (
          <p className="font-sans text-xs text-red-600 mt-1">
            {errors.fullName.message}
          </p>
        )}
      </div>

      {/* 2. Email Address */}
      <div>
        <label className="block font-sans text-xs uppercase tracking-wider text-[#16140F] mb-1.5 font-medium">
          Email Address <span className="text-[#C89A4B]">*</span>
        </label>
        <input
          type="email"
          placeholder="eleanor@example.com"
          {...register("email")}
          className={`w-full bg-[#FAF7F0] border ${
            errors.email ? "border-red-500" : "border-[#16140F]/15"
          } rounded-[3px] px-3.5 py-2.5 text-sm text-[#16140F] placeholder-[#8a7a5f]/60 focus:outline-none focus:border-[#C89A4B] transition-colors`}
        />
        {errors.email && (
          <p className="font-sans text-xs text-red-600 mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* 3. Phone / WhatsApp */}
      <div>
        <label className="block font-sans text-xs uppercase tracking-wider text-[#16140F] mb-1.5 font-medium">
          Phone / WhatsApp Number <span className="text-[#8a7a5f] font-normal lowercase">(optional)</span>
        </label>
        <input
          type="tel"
          placeholder="+1 (555) 000-0000"
          {...register("phone")}
          className="w-full bg-[#FAF7F0] border border-[#16140F]/15 rounded-[3px] px-3.5 py-2.5 text-sm text-[#16140F] placeholder-[#8a7a5f]/60 focus:outline-none focus:border-[#C89A4B] transition-colors"
        />
      </div>

      {/* 4. Journey of Interest */}
      <div>
        <label className="block font-sans text-xs uppercase tracking-wider text-[#16140F] mb-1.5 font-medium">
          Journey of Interest <span className="text-[#C89A4B]">*</span>
        </label>
        <select
          {...register("journey")}
          className={`w-full bg-[#FAF7F0] border ${
            errors.journey ? "border-red-500" : "border-[#16140F]/15"
          } rounded-[3px] px-3.5 py-2.5 text-sm text-[#16140F] focus:outline-none focus:border-[#C89A4B] transition-colors cursor-pointer`}
        >
          <option value="" disabled>
            Select a journey...
          </option>
          {journeyOptions.map((opt) => (
            <option key={opt.value} value={opt.label}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.journey && (
          <p className="font-sans text-xs text-red-600 mt-1">
            {errors.journey.message}
          </p>
        )}
      </div>

      {/* 5. Preferred Travel Dates (Toggleable mode) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block font-sans text-xs uppercase tracking-wider text-[#16140F] font-medium">
            Preferred Travel Dates <span className="text-[#8a7a5f] font-normal lowercase">(optional)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-xs text-[#5b5140] hover:text-[#16140F] transition-colors">
            <input
              type="checkbox"
              {...register("noExactDates")}
              className="accent-[#C89A4B] rounded border-gray-300 cursor-pointer"
            />
            I don&rsquo;t have exact dates yet
          </label>
        </div>

        {noExactDates ? (
          <input
            type="text"
            placeholder="e.g. sometime in the dry season, 2027"
            {...register("flexibleDatesText")}
            className="w-full bg-[#FAF7F0] border border-[#16140F]/15 rounded-[3px] px-3.5 py-2.5 text-sm text-[#16140F] placeholder-[#8a7a5f]/60 focus:outline-none focus:border-[#C89A4B] transition-colors"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <span className="block font-sans text-[11px] text-[#8a7a5f] mb-1">Start Date</span>
              <input
                type="date"
                {...register("startDate")}
                className="w-full bg-[#FAF7F0] border border-[#16140F]/15 rounded-[3px] px-3.5 py-2.5 text-sm text-[#16140F] focus:outline-none focus:border-[#C89A4B] transition-colors"
              />
            </div>
            <div>
              <span className="block font-sans text-[11px] text-[#8a7a5f] mb-1">End Date</span>
              <input
                type="date"
                {...register("endDate")}
                className="w-full bg-[#FAF7F0] border border-[#16140F]/15 rounded-[3px] px-3.5 py-2.5 text-sm text-[#16140F] focus:outline-none focus:border-[#C89A4B] transition-colors"
              />
            </div>
          </div>
        )}
      </div>

      {/* 6. Message */}
      <div>
        <label className="block font-sans text-xs uppercase tracking-wider text-[#16140F] mb-1.5 font-medium">
          Message <span className="text-[#8a7a5f] font-normal lowercase">(optional)</span>
        </label>
        <textarea
          rows={4}
          placeholder="Tell us about your ideal safari — whether it's one of the journeys above or something entirely your own."
          {...register("message")}
          className="w-full bg-[#FAF7F0] border border-[#16140F]/15 rounded-[3px] px-3.5 py-2.5 text-sm text-[#16140F] placeholder-[#8a7a5f]/60 focus:outline-none focus:border-[#C89A4B] transition-colors resize-none"
        />
      </div>

      {/* Server Error Message */}
      {serverError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700">
          {serverError}
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto min-w-[200px] px-8 py-3.5 bg-[#16140F] hover:bg-[#2b271f] text-[#FAF7F0] font-sans text-sm tracking-widest uppercase rounded-[2px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : (
            "Send Inquiry"
          )}
        </button>
      </div>
    </form>
  );
}
