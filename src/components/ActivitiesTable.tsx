import type { Activity } from "@/content/site";

export default function ActivitiesTable({ activities }: { activities: Activity[] }) {
  return (
    <table className="booktabs" data-reveal="table">
      <caption><b>Table 1.</b> Regular activities, and where to start with each one.</caption>
      <thead>
        <tr>
          <th scope="col">Activity</th>
          <th scope="col">What it involves</th>
          <th scope="col">Start here</th>
        </tr>
      </thead>
      <tbody>
        {activities.map((a) => (
          <tr key={a.name}>
            <td className="activity"><span>{a.name}</span></td>
            <td className="desc">{a.description}</td>
            <td className="next">
              <a className="text-link ext" href={a.link.href}>{a.link.label}</a>
              {a.note && <small>{a.note}</small>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
