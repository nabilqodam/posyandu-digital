function getInterpretation(
    status,
    weightZScore,
    heightZScore
) {

    if (
        weightZScore === null ||
        weightZScore === undefined
    ) {
        return null;
    }

    switch (status) {

        case 'gizi_kurang':

            return {
                title:
                    'Gizi Kurang',

                description:
                    `BB/U: ${Number(weightZScore).toFixed(1)} SD | TB/U: ${Number(heightZScore).toFixed(1)} SD. Hasil penilaian menunjukkan salah satu atau lebih indikator pertumbuhan berada di bawah standar WHO.`,

                detail:
                    'Perlu pemantauan berat badan dan tinggi badan secara berkala serta perbaikan asupan gizi sesuai usia anak.'
            };

        case 'normal':

            return {
                title:
                    'Normal',

                description:
                    `BB/U: ${Number(weightZScore).toFixed(1)} SD | TB/U: ${Number(heightZScore).toFixed(1)} SD. Berat badan dan tinggi badan anak masih berada dalam rentang pertumbuhan yang sesuai standar WHO.`,

                detail:
                    'Pertahankan pola makan bergizi seimbang dan pemantauan rutin setiap bulan.'
            };

        case 'gizi_lebih':

            return {
                title:
                    'Gizi Lebih',

                description:
                    `BB/U: ${Number(weightZScore).toFixed(1)} SD | TB/U: ${Number(heightZScore).toFixed(1)} SD. Berat badan anak berada di atas rentang standar WHO untuk usianya.`,

                detail:
                    'Perlu pengaturan pola makan dan aktivitas fisik untuk mencegah risiko kelebihan berat badan.'
            };

        default:

            return null;

    }

}

module.exports =
    getInterpretation;