const PDFDocument =
    require("pdfkit");


    
const Report =
    require("../models/Report");


    exports.summary = async (req, res) => {

        try {
    
            const summary =
                await Report.getReportSummary();
    
            res.json({
                data: summary
            });
    
        } catch (error) {
    
            res.status(500).json({
                message: error.message
            });
    
        }
    
    };


exports.exportPDF =
    async (req, res) => {

        try {

            const selectedDate =
            req.query.date;


            const data =
                await Report.getPosyanduReport();

            const doc =
                new PDFDocument({
                    margin: 30,
                    size: "A4",
                    layout: "landscape"
                });

            res.setHeader(
                "Content-Type",
                "application/pdf"
            );

            res.setHeader(
                "Content-Disposition",
                "attachment; filename=laporan-posyandu.pdf"
            );

            doc.pipe(res);

            // ======================
            // HEADER
            // ======================

            doc
                .fontSize(18)
                .text(
                    "LAPORAN POSYANDU BUNGA ASRI",
                    {
                        align: "center"
                    }
                );

            doc.moveDown();

            doc
                .fontSize(10)
                .text(
                    `Tanggal Cetak : ${new Date().toLocaleDateString("id-ID")}`
                );

            doc.moveDown(2);

            // ======================
            // TABLE HEADER
            // ======================

            const startY =
                doc.y;

            const rowHeight = 25;

            const cols = [
                30,   // No
                110,  // Nama Ortu
                100,  // NIK
                100,  // Nama Bayi
                70,   // Tgl Lahir
                40,   // JK
                50,   // Umur
                40,   // BB
                40,   // TB
                70,   // BB/U
                80    // TB/U
            ];

            let x = 30;

            const headers = [
                "No",
                "Nama Ortu",
                "NIK",
                "Nama Bayi",
                "Tgl Lahir",
                "JK",
                "Umur",
                "BB",
                "TB",
                "BB/U",
                "TB/U"
            ];

            headers.forEach(
                (header, i) => {

                    doc.rect(
                        x,
                        startY,
                        cols[i],
                        rowHeight
                    ).stroke();

                    doc.text(
                        header,
                        x + 3,
                        startY + 8,
                        {
                            width:
                                cols[i] - 6,
                            align:
                                "center"
                        }
                    );

                    x += cols[i];
                }
            );

            // ======================
            // DATA
            // ======================

            let y =
                startY + rowHeight;

            data.forEach(
                (item, index) => {

                    let x = 30;

                    const row = [

                        index + 1,
                    
                        item.parent_name,
                    
                        item.nik,
                    
                        item.baby_name,
                    
                        item.birth_date
                            ? new Date(item.birth_date)
                                .toLocaleDateString("id-ID")
                            : "-",
                    
                        item.gender,
                    
                        `${item.age_month} bln`,
                    
                        item.weight,
                    
                        item.height,
                    
                        item.nutrition_status || "-",
                    
                        item.stunting_status || "-"
                    
                    ];

                    row.forEach(
                        (value, i) => {

                            doc.rect(
                                x,
                                y,
                                cols[i],
                                rowHeight
                            ).stroke();

                            doc.text(
                                String(
                                    value ?? "-"
                                ),
                                x + 3,
                                y + 8,
                                {
                                    width:
                                        cols[
                                            i
                                        ] - 6,
                                    align:
                                        "center"
                                }
                            );

                            x += cols[i];
                        }
                    );

                    y += rowHeight;

                    if (y > 500) {
                        doc.addPage();

                        y = 50;
                    }
                }
            );

            // ======================
            // TTD
            // ======================

            doc.moveDown(5);

            doc.text(
                "Mengetahui,",
                50,
                y + 50
            );

            doc.text(
                "Koordinator Posyandu",
                50,
                y + 70
            );

            doc.text(
                "___________________",
                50,
                y + 140
            );

            doc.end();

        } catch (error) {

            console.log(error);

            res.status(500).json({
                message:
                    "Gagal membuat laporan"
            });

        }
    };