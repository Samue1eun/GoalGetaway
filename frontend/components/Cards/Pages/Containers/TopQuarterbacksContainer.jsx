import React, { useEffect, useState } from "react";
import { fetchTopQuarterbacks } from "../../../utils/fetchPlayers";
import TopQuarterbacks from "../Cards/Pages/NFLStatistics/TopQuarterbacks";

const TopQuarterbacksContainer = () => {
  const [qbs, setQbs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getQbs = async () => {
      setLoading(true);
      const data = await fetchTopQuarterbacks();
      setQbs(data);
      setLoading(false);
    };

    // Fetch once on mount
    getQbs();
  }, []);

  if (loading) {
    return <p>Loading Top Quarterbacks...</p>;
  }

  return <TopQuarterbacks qbs={qbs} />;
};

export default TopQuarterbacksContainer;
