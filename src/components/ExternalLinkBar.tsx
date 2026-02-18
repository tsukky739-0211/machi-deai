interface ExternalLinkBarProps {
  suumo: string;
  homes: string;
  townName: string;
}

export default function ExternalLinkBar({
  suumo,
  homes,
  townName,
}: ExternalLinkBarProps) {
  const suumoUrl =
    suumo || `https://suumo.jp/jj/chintai/ichiran/FR301FC001/?ar=030&bs=040&fw=${encodeURIComponent(townName)}&et=9999999&cn=9999999&mb=&mt=&shkr1=03&shkr2=03&shkr3=03&shkr4=03&rn=0010`;
  const homesUrl =
    homes || `https://www.homes.co.jp/search/freeword=${encodeURIComponent(townName)}/`;

  return (
    <div className="flex gap-3">
      <a
        href={suumoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 py-3 px-4 bg-emerald-500 text-white text-center rounded-xl font-medium text-sm hover:bg-emerald-600 transition-colors"
      >
        SUUMOで探す
      </a>
      <a
        href={homesUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 py-3 px-4 bg-blue-500 text-white text-center rounded-xl font-medium text-sm hover:bg-blue-600 transition-colors"
      >
        HOME&apos;Sで探す
      </a>
    </div>
  );
}
