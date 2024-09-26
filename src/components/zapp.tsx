"use client";

import { connect, Zapp } from "@parcnet-js/app-connector";
import { useRef, useState } from "react";

const zapp: Zapp = {
  name: "My Zapp Name",
};

export function ZupassConnector() {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState("");
  const [zupassUrl, setZupassUrl] = useState("https://staging.zupass.org/");
  const [publicKey, setPublicKey] = useState("");

  async function connectZupass() {
    const zupass = await connect(zapp, ref.current as HTMLElement, zupassUrl);
    const key = await zupass.identity.getPublicKey();
    setPublicKey(key);

    return zupass;
  }

  async function getPODs() {
    const zupass = await connectZupass();

    try {
      const pods = await zupass.pod.query({
        entries: { // Types?
          greeting: { type: "string" },
        },
      } as any);
      console.log("pods", pods);
    } catch (e: any) {
      console.error(e);
      setError(e.message);
    }
  }

  return (
    <div>
      <div ref={ref}></div>

      {error && <p className="mt-4 p-4 bg-red-400">ERROR: {error}</p>}

      <div className="mt-4">
        <h2 className="text-lg">Connect Zupass</h2>
        <input
          type="text"
          className="border p-1 w-80"
          value={zupassUrl}
          onChange={(e) => setZupassUrl(e.target.value)}
        />
        <br />
        <button className="p-1 mt-2 bg-blue-200" onClick={connectZupass}>
          Connect
        </button>
        <p>Public Key: {publicKey}</p>
      </div>

      <div className="mt-4">
        <h2 className="text-lg">PODs</h2>
        <div>
          <button className="p-1 mt-2 bg-blue-200" onClick={getPODs}>
            Get PODs
          </button>
        </div>
      </div>
    </div>
  );
}
