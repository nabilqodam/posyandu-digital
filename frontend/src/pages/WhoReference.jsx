import { useEffect, useState } from "react";
import { getWhoReference } from "../_services/who";

export default function WhoReference() {

    const [data, setData] =
        useState([]);

        const [gender, setGender] =
        useState("L");
    
    const [measurementType, setMeasurementType] =
        useState("BB");

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        try {

            const res =
                await getWhoReference();


            setData(
                res.data
            );

        } catch (error) {

            console.log(error);

        }

    };

    const filteredData =
    data.filter(
        item =>
            item.gender === gender &&
            item.measurement_type === measurementType
    );

    const renderTable = (
        title,
        rows,
        unit
    ) => (

        <div className="bg-white rounded-xl shadow p-4">

            <h3 className="font-bold text-lg mb-4">
                {title}
            </h3>

            <table className="w-full border-collapse">

                <thead>

                    <tr className="bg-gray-100">

                        <th className="p-2 border">
                            Umur (bulan)
                        </th>

                        <th className="p-2 border">
                            Rentang Normal
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {rows.map(item => (

                        <tr key={item.age_month}>

                            <td className="p-2 border text-center">
                                {item.age_month}
                            </td>

                            <td className="p-2 border text-center">

                                {item.sd2neg}
                                {" - "}
                                {item.sd2}
                                {" "}
                                {unit}

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

    return (

        <div className="space-y-6">

            <div className="bg-blue-50 p-4 rounded-xl">

                <h2 className="font-bold text-xl">
                    Referensi Pertumbuhan WHO
                </h2>

                <p className="text-gray-600 mt-2">
                    Rentang normal menggunakan standar WHO
                    berdasarkan SD-2 sampai SD+2.
                </p>

            </div>

            <div className="bg-white rounded-xl shadow p-4 flex gap-4 flex-wrap">

    <div>
        <label className="block text-sm mb-1">
            Kelamin
        </label>

        <select
            value={gender}
            onChange={(e) =>
                setGender(e.target.value)
            }
            className="border rounded-lg p-2"
        >
            <option value="L">
                Laki-laki
            </option>

            <option value="P">
                Perempuan
            </option>

        </select>
    </div>

    <div>
        <label className="block text-sm mb-1">
            Jenis Pengukuran
        </label>

        <select
            value={measurementType}
            onChange={(e) =>
                setMeasurementType(
                    e.target.value
                )
            }
            className="border rounded-lg p-2"
        >
            <option value="BB">
                Berat Badan / Umur
            </option>

            <option value="TB">
                Tinggi Badan / Umur
            </option>

        </select>
    </div>

</div>

            {renderTable(

                            `${
                                measurementType === "BB"
                                    ? "BB/U"
                                    : "TB/U"
                            } ${
                                gender === "L"
                                    ? "Laki-laki"
                                    : "Perempuan"
                            }`,

                            filteredData,

                            measurementType === "BB"
                                ? "kg"
                                : "cm"

                            )}

        </div>

    );

}