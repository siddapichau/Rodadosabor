// ===== ANÚNCIO COM ADMOB (NATIVO) E FALLBACK (WEB) =====
let lastAdTime = 0;
let rewardedAdLoaded = false;
const ADMOB_REWARDED_ID = 'ca-app-pub-3940256099942544/5224354917'; // ID de teste (substitua pelo seu)

window.ganharMoedasAnuncio = async function() {
    console.log("📢 ganharMoedasAnuncio chamado");

    // Verifica se está no Capacitor (app nativo)
    const isNative = typeof window.Capacitor !== 'undefined' && window.Capacitor.isNativePlatform();

    if (!isNative) {
        // === MODO WEB (SIMULAÇÃO) ===
        if (!window.isServerSynced) {
            console.warn("❌ Servidor não sincronizado");
            return false;
        }
        const now = Date.now();
        const diff = now - lastAdTime;
        console.log(`⏱️ Último anúncio há ${Math.round(diff/1000)}s`);
        if (diff < 25000) {
            console.warn("🛑 SPAM Bloqueado (menos de 25s)");
            return false;
        }
        lastAdTime = now;
        _rawState.coins += 3;
        window.saveData();
        console.log(`✅ +3 moedas. Total: ${_rawState.coins}`);
        return true;
    }

    // === MODO NATIVO (ADMOB REAL) ===
    try {
        // Carrega o anúncio se não estiver carregado
        if (!rewardedAdLoaded) {
            const { AdMob } = window.Capacitor.Plugins;
            await AdMob.loadRewardedAd({
                adId: ADMOB_REWARDED_ID,
                isTest: true, // Mude para false em produção
            });
            rewardedAdLoaded = true;
            console.log('✅ Anúncio recompensado carregado');
        }

        // Exibe o anúncio e aguarda recompensa
        return new Promise((resolve) => {
            const { AdMob } = window.Capacitor.Plugins;

            // Listener para recompensa
            const rewardListener = AdMob.addListener('rewardedAdReward', (reward) => {
                console.log('🎁 Recompensa concedida:', reward.amount);
                _rawState.coins += reward.amount || 3; // fallback
                window.saveData();
                window.updateCoinsDisplay();
                alert(`🎉 Você ganhou ${reward.amount || 3} moedas!`);
                rewardListener.remove();
                resolve(true);
            });

            // Listener para fechamento sem recompensa
            const closeListener = AdMob.addListener('rewardedAdClosed', () => {
                console.log('🚪 Anúncio fechado sem recompensa');
                closeListener.remove();
                resolve(false);
            });

            AdMob.showRewardedAd().catch((err) => {
                console.error('Erro ao exibir anúncio:', err);
                // Fallback: concede 3 moedas mesmo com erro (opcional)
                _rawState.coins += 3;
                window.saveData();
                window.updateCoinsDisplay();
                alert('⚠️ Erro no anúncio, mas você ganhou 3 moedas de cortesia!');
                resolve(true);
            });
        });
    } catch (error) {
        console.error('❌ Erro no AdMob:', error);
        // Fallback para simulação
        _rawState.coins += 3;
        window.saveData();
        window.updateCoinsDisplay();
        alert('⚠️ Anúncio indisponível, mas você ganhou 3 moedas de cortesia!');
        return true;
    }
};