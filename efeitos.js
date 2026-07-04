'use strict';
console.log('efeitos.js carregado');

// ========================== GERENCIADOR DE EFEITOS ==========================
class EffectsManager {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.running = false;
        this.animationId = null;
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        if (this.canvas) {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
    }

    launch(type, options = {}) {
        this.stop();
        this.particles = [];
        this.running = true;
        this.type = type;

        switch (type) {
            case 'confetti': this._generateConfetti(options); break;
            case 'fireworks': this._generateFireworks(options); break;
            case 'stars': this._generateStars(options); break;
            default: this.running = false; return;
        }
        if (this.particles.length === 0) {
            this.running = false;
            return;
        }
        this.animate();
    }

    stop() {
        this.running = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        this.particles = [];
    }

    animate() {
        if (!this.running || this.particles.length === 0) {
            this.running = false;
            if (this.ctx) this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            return;
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const toRemove = [];

        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            this._updateParticle(p);
            this._drawParticle(p);
            if (p.life <= 0 || p.y > this.canvas.height + 50) {
                toRemove.push(i);
            }
        }

        for (let i = toRemove.length - 1; i >= 0; i--) {
            this.particles.splice(toRemove[i], 1);
        }

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    // ---------- GERAÇÃO DE PARTÍCULAS ----------
    _generateConfetti() {
        const colors = ['#ff0', '#f0f', '#0ff', '#f44', '#4f4', '#44f', '#ffa500', '#ff69b4', '#adff2f', '#ff4500', '#9400d3', '#00ffff'];
        const shapes = ['circle', 'square', 'diamond', 'triangle'];
        for (let i = 0; i < 180; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height - this.canvas.height,
                w: Math.random() * 14 + 6,
                h: Math.random() * 14 + 6,
                color: colors[Math.floor(Math.random() * colors.length)],
                shape: shapes[Math.floor(Math.random() * shapes.length)],
                vx: (Math.random() - 0.5) * 7,
                vy: Math.random() * 5 + 3,
                rot: Math.random() * 360,
                rotSpeed: (Math.random() - 0.5) * 12,
                life: 1,
                decay: 0.005 + Math.random() * 0.01
            });
        }
    }

    _generateFireworks() {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff8800', '#ff0088'];
        for (let f = 0; f < 3; f++) {
            const cx = Math.random() * this.canvas.width;
            const cy = Math.random() * this.canvas.height * 0.6 + 50;
            for (let i = 0; i < 80; i++) {
                const angle = Math.random() * 2 * Math.PI;
                const speed = Math.random() * 5 + 2;
                this.particles.push({
                    x: cx, y: cy,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed - 1,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    life: 1.0,
                    decay: 0.01 + Math.random() * 0.02,
                    size: Math.random() * 4 + 2
                });
            }
        }
    }

    _generateStars() {
        for (let i = 0; i < 20; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height * 0.5,
                vx: (Math.random() - 0.5) * 3,
                vy: Math.random() * 2 + 1,
                size: Math.random() * 4 + 2,
                color: `hsl(${Math.random() * 60 + 40}, 100%, 80%)`,
                life: 1.0,
                decay: 0.005 + Math.random() * 0.01
            });
        }
    }

    // ---------- ATUALIZAÇÃO E DESENHO ----------
    _updateParticle(p) {
        p.x += p.vx || 0;
        p.y += p.vy || 0;
        p.vy = (p.vy || 0) + 0.08;
        p.rot = (p.rot || 0) + (p.rotSpeed || 0);
        p.life -= (p.decay || 0.01);
    }

    _drawParticle(p) {
        const ctx = this.ctx;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(((p.rot || 0) * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;

        if (this.type === 'fireworks' || this.type === 'stars') {
            if (this.type === 'stars') {
                ctx.beginPath();
                for (let j = 0; j < 8; j++) {
                    const angle = (j * Math.PI) / 4 - Math.PI / 2;
                    const radius = j % 2 === 0 ? p.size : p.size * 0.4;
                    const x = radius * Math.cos(angle);
                    const y = radius * Math.sin(angle);
                    if (j === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.closePath();
                ctx.fill();
            } else {
                ctx.beginPath();
                ctx.arc(0, 0, (p.size || 3) * p.life, 0, 2 * Math.PI);
                ctx.fill();
            }
        } else {
            const w = p.w || 10;
            const h = p.h || 10;
            switch (p.shape) {
                case 'circle':
                    ctx.beginPath();
                    ctx.arc(0, 0, w / 2, 0, 2 * Math.PI);
                    ctx.fill();
                    break;
                case 'square':
                    ctx.fillRect(-w / 2, -h / 2, w, h);
                    break;
                case 'diamond':
                    ctx.beginPath();
                    ctx.moveTo(0, -h / 2);
                    ctx.lineTo(w / 2, 0);
                    ctx.lineTo(0, h / 2);
                    ctx.lineTo(-w / 2, 0);
                    ctx.closePath();
                    ctx.fill();
                    break;
                case 'triangle':
                    ctx.beginPath();
                    ctx.moveTo(0, -h / 2);
                    ctx.lineTo(w / 2, h / 2);
                    ctx.lineTo(-w / 2, h / 2);
                    ctx.closePath();
                    ctx.fill();
                    break;
            }
        }
        ctx.restore();
    }
}

// ========================== INSTÂNCIA GLOBAL ==========================
let effectsManager = null;

function getEffectsManager() {
    if (!effectsManager) {
        effectsManager = new EffectsManager('confettiCanvas');
    }
    return effectsManager;
}

// ========================== FUNÇÃO PARA LANÇAR EFEITO ATIVO ==========================
window.launchCurrentEffect = function() {
    const effectId = window.appState.currentEffect || 'effect-1';
    const effect = (window.EFEITOS_VISUAIS || []).find(e => e.id === effectId) || { type: 'confetti' };
    getEffectsManager().launch(effect.type);
};

// ========================== FUNÇÕES LEGACY ==========================
window.launchConfetti = function() {
    getEffectsManager().launch('confetti');
};
window.launchFireworks = function() {
    getEffectsManager().launch('fireworks');
};
window.launchStars = function() {
    getEffectsManager().launch('stars');
};

window.addEventListener('beforeunload', () => {
    if (effectsManager) effectsManager.stop();
});