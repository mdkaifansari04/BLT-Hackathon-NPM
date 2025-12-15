import { Trophy } from "lucide-react";
import { Prize } from "../../types/config";

function Prizes(props: { prize: Prize[] }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        <i className="fas fa-trophy mr-2 text-red-600"></i>
        Prizes
      </h2>
      <div className="space-y-6">
        {props.prize.map((prize) => (
          <PrizeCard key={prize.position} position={prize.position} title={prize.title} description={prize.description} value={prize.value} />
        ))}
      </div>
    </div>
  );
}

interface PrizeCardProps {
  position: number;
  title: string;
  description: string;
  value?: string;
}

function PrizeCard(props: PrizeCardProps) {
  let icon, iconColor;
  if (props.position === 1) {
    iconColor = "text-yellow-500";
  } else if (props.position === 2) {
    iconColor = "text-gray-400";
  } else if (props.position === 3) {
    iconColor = "text-orange-600";
  } else {
    iconColor = "text-blue-500";
  }

  return (
    <div className="border-b pb-4 last:border-b-0 last:pb-0">
      <div className="flex items-center mb-2">
        <Trophy className={`${iconColor} mr-2 w-6`} />
        <h3 className="text-xl font-semibold">{props.title}</h3>
      </div>
      <p className="text-gray-600 mb-2">{props.description}</p>
      {props.value && <p className="font-medium text-red-600">{props.value}</p>}
    </div>
  );
}

export default Prizes;
