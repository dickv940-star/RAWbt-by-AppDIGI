class AIEngine {

    async analyze(product, validation, brain) {

        // nanti ini bisa diganti OpenAI API
        return this.simulateGPT(product, validation, brain);
    }

    simulateGPT(product, validation, brain) {

        let hook = "";
        let insight = "";
        let cta = "";

        // HOOK
        if (brain.productScore >= 85) {
            hook = "Ini bukan produk biasa...";
        } else if (brain.productScore >= 70) {
            hook = "Banyak orang belum tahu ini...";
        } else {
            hook = "Produk ini punya potensi tersembunyi...";
        }

        // INSIGHT
        insight =
            `Produk ini cocok untuk ${brain.targetBuyer}. ` +
            `Dengan viral score ${brain.viralScore}/100, ` +
            `produk ini memiliki potensi engagement tinggi di TikTok & Reels.`;

        // CTA
        if (brain.productScore >= 80) {
            cta = "Klik sekarang sebelum stok habis 🔥";
        } else {
            cta = "Coba cek dulu, siapa tahu cocok untuk kamu";
        }

        return {
            hook,
            insight,
            cta,
            fullScript: `${hook}\n\n${insight}\n\n${cta}`
        };
    }
}
