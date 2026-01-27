import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MapPage() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/contact")
      .then(res => setContacts(res.data));
  }, []);

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl  mt-30 font-bold mb-8">Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {contacts.map(c => (
            <div
              key={c.id}
              className={`border rounded-lg p-5 ${
                c.status ? "border-green-500" : "border-gray-300 opacity-60"
              }`}
            >
              <p><b>Phone:</b> {c.phone}</p>
              <p><b>Email:</b> {c.email}</p>
              <p><b>Address:</b> {c.address}</p>

              <iframe
                className="w-full h-100 mt-4 rounded"
                src={`https://www.google.com/maps?q=${c.latitude},${c.longitude}&output=embed`}
                loading="lazy"
              ></iframe>
            </div>
          ))}
        </div>
      </div>
<div className="-mx-48"> <Footer /></div>
     
    </>
  );
}