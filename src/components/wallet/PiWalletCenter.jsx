import React from 'react';

export default function PiWalletCenter({ theme, userProfile, piWalletBalance, piBalance, piTransactions }) {
  return (
    <div className={`p-5 rounded-3xl border ${theme.card} space-y-4`}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-extrabold text-base sm:text-lg">HomePlate • Pi Browser 지갑 & 결제 원장</h2>
          <p className={`text-xs ${theme.subtext}`}>
            계정: @{userProfile.username} • 지갑: {userProfile.walletAddress}
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500/15 text-emerald-500">
          CONNECTED
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className={`p-4 rounded-2xl border ${theme.card}`}>
          <span className={`text-xs ${theme.subtext}`}>온체인 Pi 지갑 잔액</span>
          <p className="text-xl font-black text-amber-500 mt-1">{piWalletBalance} π</p>
        </div>
        <div className={`p-4 rounded-2xl border ${theme.card}`}>
          <span className={`text-xs ${theme.subtext}`}>출금 가능 앱 보상</span>
          <p className="text-xl font-black text-emerald-500 mt-1">+{piBalance} π</p>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xs font-extrabold">⛓️ 최근 블록체인 트랜잭션 내역</h3>
        {piTransactions.map((tx) => (
          <div key={tx.id} className={`p-3 rounded-2xl border flex justify-between text-xs ${theme.card}`}>
            <div>
              <span className="font-extrabold">{tx.title}</span>
              <span className={`block text-[10px] font-mono ${theme.subtext}`}>
                TxID: {tx.txid} • {tx.counterparty}
              </span>
            </div>
            <span className={`font-black ${tx.amount > 0 ? 'text-emerald-500' : 'text-amber-500'}`}>
              {tx.amount > 0 ? `+${tx.amount} π` : `${tx.amount} π`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
