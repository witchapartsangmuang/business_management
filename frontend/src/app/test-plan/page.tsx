'use client'

import { useEffect, useState } from "react"

export default function Page() {
  const [start_date, set_start_date] = useState(DateFormat(new Date))
  const [end_date, set_end_date] = useState()
  const [activity, set_activity] = useState([])
  function DateFormat(date) {
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  }
  useEffect(() => {
    console.log("today", DateFormat(new Date));

  }, [])
  return (
    <>
      <div>
        <div>Start Date</div>
        <input type="date" value={start_date} onChange={(e) => { set_start_date(e.target.value) }} />
        <div>End Date</div>
        <input type="date" value={end_date} onChange={(e) => { set_end_date(e.target.value) }} />
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th></th>
            </tr>
          </thead>
        </table>
      </div>
    </>
  )
}