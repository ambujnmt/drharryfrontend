import { Table } from "react-bootstrap";
import { BasicPortlet } from "./Portlet";
import { color } from "framer-motion";

export default function TopSellingProducts() {
  const socialWorkData = [
    { activity: "Food Distribution", count: 120 },
    { activity: "Education Support", count: 80 },
    { activity: "Health Camps", count: 50 },
  ];

  const patientData = [
    { name: "John Doe", visits: 5, status: "Stable" },
    { name: "Jane Smith", visits: 2, status: "Recovering" },
    { name: "Robert Brown", visits: 8, status: "Under Observation" },
  ];

  const criticalPatientData = [
    { name: "Alice Green", icuDays: 10, condition: "Critical" },
    { name: "Michael Lee", icuDays: 7, condition: "Serious" },
    { name: "Emily White", icuDays: 15, condition: "Under Ventilator" },
  ];

  const maxRows = Math.max(
    socialWorkData.length,
    patientData.length,
    criticalPatientData.length
  );

  return (
    <BasicPortlet cardTitle="Summary" titleClass="text-black">
      <div className="table-responsive">
        <Table hover className="table-centered mb-0">
          <thead>
            <tr>
              <th className="font-medium !text-gray-500" >Social Work</th>
              <th className="font-medium !text-gray-500" >Patient</th>
              <th className="font-medium !text-gray-500" >Critical Patient</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(maxRows)].map((_, i) => (
              <tr key={i}>
                <td className="!text-gray-400">
                  {socialWorkData[i]
                    ? `${socialWorkData[i].activity} (${socialWorkData[i].count})`
                    : "-"}
                </td>
                <td className="!text-gray-400 text-sm">
                  {patientData[i]
                    ? `${patientData[i].name} - ${patientData[i].visits} visits (${patientData[i].status})`
                    : "-"}
                </td>
                <td className="!text-gray-400 text-sm">
                  {criticalPatientData[i]
                    ? `${criticalPatientData[i].name} - ${criticalPatientData[i].icuDays} ICU days (${criticalPatientData[i].condition})`
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </BasicPortlet>
  );
}
