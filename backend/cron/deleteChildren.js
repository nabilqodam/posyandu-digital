const cron =
    require('node-cron');

const db =
    require('../database/config');

cron.schedule('0 0 * * *', async () => {

    try {

        // HAPUS BALITA
        // USIA >= 60 BULAN
        const [result] = await db.query(`
            DELETE FROM children
            WHERE TIMESTAMPDIFF(
                MONTH,
                birth_date,
                CURDATE()
            ) >= 60
        `);

        console.log(
            `${result.affectedRows} balita usia > 5 tahun berhasil dihapus`
        );

    } catch (error) {

        console.log(
            'Cron delete error:',
            error.message
        );

    }

});