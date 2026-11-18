import React from 'react';
import { X } from 'lucide-react';

export default function PiPaymentSheetModal({ paymentSheet, setPaymentSheet, executePiPaymentFlow }) {
  if (!paymentSheet) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-amber-500/40 text-white p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-extrabold text-base">Pi Wallet 공식 결제 시트 (Pi.createPayment)</h3>
          <button onClick={() => setPaymentSheet(null)} className="p-1.5 rounded-xl bg-slate-800 text-slate-300">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 mb-4 text-center">
          <p className="text-2xl font-black text-amber-400">{paymentSheet.amount} π</p>
          <p className="text-xs font-bold text-slate-200 mt-1">{paymentSheet.title}</p>
        </div>

        <div className="space-y-2 mb-5 text-xs">
          <div className={`p-2.5 rounded-xl border flex justify-between ${paymentSheet.step >= 1 ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300' : 'bg-slate-800/60 border-slate-700 text-slate-400'}`}>
            <span>1. Payment Intent 생성</span>
            <span>{paymentSheet.step >= 1 ? '완료 ✓' : '대기'}</span>
          </div>
          <div className={`p-2.5 rounded-xl border flex justify-between ${paymentSheet.step >= 2 ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300' : 'bg-slate-800/60 border-slate-700 text-slate-400'}`}>
            <span>2. onReadyForServerApproval (/api/approve-payment)</span>
            <span>{paymentSheet.step >= 2 ? '승인됨 ✓' : '대기'}</span>
          </div>
          <div className={`p-2.5 rounded-xl border flex justify-between ${paymentSheet.step >= 3 ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300' : 'bg-slate-800/60 border-slate-700 text-slate-400'}`}>
            <span>3. onReadyForServerCompletion (/api/complete-payment)</span>
            <span>{paymentSheet.step >= 3 ? '확정 ✓' : '대기'}</span>
          </div>
        </div>

        {paymentSheet.step === 0 ? (
          <button
            onClick={executePiPaymentFlow}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs"
          >
            Pi 지갑으로 {paymentSheet.amount} π 승인하기
          </button>
        ) : paymentSheet.step < 3 ? (
          <div className="w-full py-3 rounded-2xl bg-slate-800 text-amber-300 font-bold text-xs text-center animate-pulse">
            Pi 블록체인 노드와 통신 중...
          </div>
        ) : (
          <button
            onClick={() => setPaymentSheet(null)}
            className="w-full py-3 rounded-2xl bg-emerald-600 text-white font-extrabold text-xs"
          >
            결제 확인 및 닫기
          </button>
        )}
      </div>
    </div>
  );
}

