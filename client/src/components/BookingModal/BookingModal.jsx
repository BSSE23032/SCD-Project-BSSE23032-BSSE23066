import React, { useState } from "react";
import { Modal, Button, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import axios from "axios";

const BookingModal = ({ opened, setOpened, residencyId }) => {

  const [date, setDate] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

const handleBooking = async () => {
  console.log("RESIDENCY ID:", residencyId);
  try {
    setLoading(true);

    if (!residencyId) {
      toast.error("Property not found");
      return;
    }
    
    await axios.post("http://localhost:3000/api/bookings/book", {
      name,
      email,
      phone,
      date: dayjs(date).toISOString(),
      residencyId, // 🔥 APPROACH 1 KEY POINT
    });

    toast.success("Visit booked successfully!", {
      position: "bottom-right",
    });

    setName("");
    setEmail("");
    setPhone("");
    setDate(null);
    setOpened(false);
  } catch (err) {
    toast.error("Booking failed!");
    console.error(err);
  } finally {
    setLoading(false);
  }
};


  return (
    <Modal opened={opened} onClose={() => setOpened(false)} title="Book a Visit" centered>
      <div className="flexColCenter" style={{ gap: "1rem" }}>
        <TextInput label="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <TextInput label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <TextInput label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />

        <DatePicker
          label="Visit Date"
          value={date}
          onChange={setDate}
          minDate={new Date()}
          required
        />

        <Button fullWidth loading={loading} disabled={!name || !email || !phone || !date} onClick={handleBooking}>
          Book Visit
        </Button>
      </div>
    </Modal>
  );
};

export default BookingModal;
