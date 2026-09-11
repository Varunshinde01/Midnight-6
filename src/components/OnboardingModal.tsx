// src/components/OnboardingModal.tsx
import React, { useState } from 'react';
import { X, Wallet, ShieldCheck, Coins, Key, ArrowRight, CheckCircle2 } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnectWallet: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose, onConnectWallet }) => {
  const [currentStep, setCurrentStep] = useState(1);

  if (!isOpen) return null;

  const steps = [
    {
      step: 1,
      title: 'Midnight Lace Wallet Setup',
      icon: Wallet,
      description: 'Install the official Midnight Lace Wallet Chrome extension and create your shielded keypair.',
      actionText: 'Connect Preprod Wallet',
    },
    {
      step: 2,
      title: 'Midnight Preprod Network Selection',
      icon: ShieldCheck,
      description: 'Ensure your Lace Wallet network toggle is set to "Midnight Preprod Testnet" (Chain ID: 0x020088f1).',
      actionText: 'Confirm Preprod Network',
    },
    {
      step: 3,
      title: 'Claim Preprod tDUST Faucet Tokens',
      icon: Coins,
      description: 'Request free testnet tDUST from the Midnight faucet to pay for zero-knowledge transaction gas.',
      actionText: 'Claim 100,000 tDUST',
    },
    {
      step: 4,
      title: 'ZK Proof Key Registration & Onboarding',
      icon: Key,
      description: 'Generate your local WASM zero-knowledge witness keys and complete preprod user registration.',
      actionText: 'Complete Onboarding',
    },
  ];

  const activeStepObj = steps[currentStep - 1];

  const handleStepAction = () => {
    if (currentStep === 1) {
      onConnectWallet();
    }
    if (currentStep < 4) {
      setCurrentStep(s => s + 1);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="glass-card w-full max-w-xl p-6 rounded-2xl border border-indigo-500/30 relative shadow-2xl bg-slate-950/95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
              Level 6 User Onboarding Playbook
            </span>
            <h2 className="text-xl font-extrabold text-white mt-1">
              4-Step Guided Preprod Onboarding Wizard
            </h2>
          </div>

          {/* Stepper Progress Bar */}
          <div className="grid grid-cols-4 gap-2">
            {steps.map((s) => (
              <div key={s.step} className="space-y-1">
                <div
                  className={`h-1.5 rounded-full transition-colors ${
                    s.step <= currentStep ? 'bg-indigo-500' : 'bg-slate-800'
                  }`}
                />
                <span className="text-[10px] font-semibold text-gray-400 block text-center">
                  Step {s.step}
                </span>
              </div>
            ))}
          </div>

          {/* Active Step Content */}
          <div className="p-5 rounded-xl bg-slate-900/90 border border-white/10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30">
                <activeStepObj.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">{activeStepObj.title}</h3>
                <p className="text-xs text-gray-400">Step {currentStep} of 4</p>
              </div>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">
              {activeStepObj.description}
            </p>

            {currentStep === 3 && (
              <div className="p-3 rounded bg-amber-950/30 border border-amber-500/20 text-xs text-amber-300">
                💡 Need tDUST? Visit the official Midnight Faucet at{' '}
                <a
                  href="https://faucet.preprod.midnight.network"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-amber-200 hover:text-white"
                >
                  faucet.preprod.midnight.network
                </a>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <button
              disabled={currentStep === 1}
              onClick={() => setCurrentStep(s => s - 1)}
              className="px-4 py-2 bg-slate-800 text-gray-400 rounded-lg text-xs font-semibold disabled:opacity-30 hover:bg-slate-700"
            >
              Previous
            </button>

            <button
              onClick={handleStepAction}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold flex items-center gap-2"
            >
              {activeStepObj.actionText}
              {currentStep < 4 ? <ArrowRight className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
