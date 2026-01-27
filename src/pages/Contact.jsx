import { useEffect, useState } from "react";
import axios from "axios";

export default function Contact() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/contact/active")
      .then(res => setContacts(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center mt-6">Loading contact info...</p>;
  }

  if (!contacts.length) {
    return <p className="text-center mt-6">No contact info available</p>;
  }

  return (
    <div className="grid grid-cols-1 text-white md:grid-cols-3 gap-6 mt-9 text-sm">
      {contacts.map((c) => (
        <div key={c.id} className="space-y-2">
          {c.phone && <p>📞 {c.phone}</p>}
          {c.email && <p>📧 {c.email}</p>}
          {c.address && <p>📍 {c.address}</p>}
        </div>
      ))}
    </div>
  );
}