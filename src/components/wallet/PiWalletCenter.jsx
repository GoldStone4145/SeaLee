export default function PiWalletCenter({
  theme,
  piNetworkMode,
  setPiNetworkMode,
  piAuthUser,
  piWalletBalance,
  piBalance,
  piTransactions,
  openPiPaymentSheet,
  copyTextSafe
}) {
  return (
    <div className={`p-5 rounded-3xl border ${theme.card} space-y-4`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-base sm:text-lg">Pi Browser 지갑 & SDK v2.0 센터</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
                CONNECTED
              </span>
            </div>
            <p className={`text-xs ${theme.subtext}`}>
              Pi.authenticate 공식 인증 • Pi.createPayment 양방향(U2A/A2U) 결제 원장
            </p>
          </div>
        </div>
        <div className={`p-1 rounded-2xl border flex items-center gap-1 ${theme.card}`}>
          <button
            onClick={() => setPiNetworkMode('testnet')}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition ${
              piNetworkMode === 'testnet' ? 'bg-amber-500 text-white shadow' : theme.subtext
            }`}
          >
            Pi Testnet
          </button>
          <button
            onClick={() => setPiNetworkMode('mainnet')}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition ${
              piNetworkMode === 'mainnet' ? 'bg-emerald-600 text-white shadow' : theme.subtext
            }`}
          >
            Pi Mainnet
          </button>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-amber-500/30 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center text-sm">π</span>
            <div>
              <p className="text-xs text-amber-300 font-bold">Pi Pioneer Authenticated Session</p>
              <p className="text-sm font-black">@{piAuthUser.username}</p>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-white/10 text-emerald-300 border border-emerald-400/30">
            Scopes: {piAuthUser.scopes.join(', ')}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between gap-2 mb-4">
          <div className="min-w-0">
            <span className="text-[10px] text-slate-400 block">연동된 Pi 지갑 공개키 (Public Key)</span>
            <p className="text-xs font-mono font-bold text-amber-200 truncate">{piAuthUser.walletAddress}</p>
          </div>
          <button
            onClick={() => copyTextSafe(piAuthUser.walletAddress, '지갑 공개키')}
            className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold shrink-0 flex items-center gap-1"
          >
            <Copy className="w-3.5 h-3.5" /> 복사
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-slate-300">온체인 Pi 지갑 잔액</span>
            <p className="text-xl font-black text-amber-400 mt-0.5">{piWalletBalance} π</p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-slate-300">앱 내 출금 가능 보상</span>
            <p className="text-xl font-black text-emerald-400 mt-0.5">+{piBalance} π</p>
          </div>
          <div className="col-span-2 sm:col-span-1 flex flex-col justify-center gap-1.5">
            <button
              onClick={() =>
                openPiPaymentSheet({
                  mode: 'A2U',
                  title: '앱 리워드 전액 Pi 지갑 출금 (A2U)',
                  amount: piBalance,
                  memo: 'Pi-Bridge Quest & Recipe Creator Payout',
                  recipient: `@${piAuthUser.username}`
                })
              }
              className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs shadow"
            >
              보상 지갑 출금 ({piBalance} π)
            </button>
            <button
              onClick={() =>
                openPiPaymentSheet({
                  mode: 'U2A',
                  title: '프리미엄 가족 레시피 구독권 결제 테스트',
                  amount: 1.0,
                  memo: 'Pi Hackathon SDK v2.0 U2A Test Payment',
                  recipient: '@pi_bridge_treasury'
                })
              }
              className="w-full py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-[11px]"
            >
              U2A 1.0 π 결제 테스트
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xs font-extrabold uppercase tracking-wider">⛓️ 실시간 Pi 지갑 트랜잭션 내역 (U2A / A2U Ledger)</h3>
        {piTransactions.map((tx) => (
          <div key={tx.id} className={`p-3 rounded-2xl border flex items-center justify-between gap-2 ${theme.card}`}>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span
                  className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${
                    tx.type === 'A2U' ? 'bg-emerald-500/15 text-emerald-500' : 'bg-amber-500/15 text-amber-500'
                  }`}
                >
                  {tx.type === 'A2U' ? 'A2U 보상입금' : 'U2A 지갑결제'}
                </span>
                <span className="text-xs font-bold truncate">{tx.title}</span>
              </div>
              <div className={`flex items-center gap-2 text-[10px] font-mono mt-1 ${theme.subtext}`}>
                <span>TxID: {tx.txid}</span>
                <span>• {tx.counterparty}</span>
                <span>• {tx.timestamp}</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className={`text-sm font-black ${tx.amount > 0 ? 'text-emerald-500' : 'text-amber-500'}`}>
                {tx.amount > 0 ? `+${tx.amount} π` : `${tx.amount} π`}
              </span>
              <span className="block text-[9px] font-bold text-emerald-500">{tx.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

