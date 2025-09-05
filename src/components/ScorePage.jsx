import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function ScorePage({ login, handleLogout }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["nilai"],
    queryFn: async () => {
      const params = new URLSearchParams({
        nama: login.nama,
        kelas: login.kelas,
        kode: login.kode,
      });
      const res = await fetch(
        `https://script.google.com/macros/s/AKfycbzbIbaZN21_3PEqdMmAh-j3fRfFOYcBr4-MQ2TVYS4vygTq-FjD8pdYUxLbnvtoQaRYMA/exec?${params.toString()}`
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      return res.json();
    },
    enabled: !!(login.nama && login.kelas && login.kode),
    staleTime: 0,
    cacheTime: 0,
  });

  useEffect(() => {
    if (error) {
      handleLogout();
    }
  }, [error, handleLogout]);

  useEffect(() => {
    if (data && (data.error || Array.isArray(data) === false)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ada kesalahan pada Nama, Kode Unik, atau Kelas. Silahkan coba lagi.",
      });
      handleLogout();
    }
  });

  if (isLoading) {
    return (
      <div className="display-wrapper">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error) {
    return;
  }

  if (data.error || Array.isArray(data) === false) {
    return;
  }

  return (
    <div className="display-wrapper">
      <h2>{login.nama}'s score</h2>
      <div className="nilai-wrapper">
        {!isLoading &&
          data?.map((chapterObj, index) => {
            const chapterName = Object.keys(chapterObj)[0];
            const scores = chapterObj[chapterName];

            return (
              <div key={`chapter$-${index}`} className="chapter">
                <h3 className="">{chapterName}</h3>
                <div className="scores-list">
                  {scores.map((scoreObj, scoreIndex) => {
                    const testName = Object.keys(scoreObj)[0];
                    const score = scoreObj[testName];
                    return (
                      <div key={`${testName}-score-${scoreIndex}`} className="score-item">
                        <p>{testName}</p>
                        <p>{score}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
      <Button variant="contained" id="keluar" onClick={handleLogout} size="large">
        Keluar
      </Button>
    </div>
  );
}
