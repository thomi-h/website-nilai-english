export default function ScoreCard({ scoreData, handleLogout }) {
  return (
    <>
      {scoreData?.map((chapterObj, index) => {
        const chapterName = Object.keys(chapterObj)[0];
        const scores = chapterObj[chapterName];

        return (
          <div key={`chapter-${index}`} className="">
            <h3 className="">{chapterName}</h3>
            <div className="">
              {scores.map((scoreObj, scoreIndex) => {
                const testName = Object.keys(scoreObj)[0];
                const score = scoreObj[testName];
                return (
                  <div key={`${testName}-score-${scoreIndex}`}>
                    <p>{testName}</p>
                    <p>{score}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}
