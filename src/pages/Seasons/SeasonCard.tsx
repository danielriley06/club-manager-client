import { Card } from "antd";
import * as React from "react";

import { ISeason } from "../../types/types";
import { formatSeasonDate } from "../../utils/utils";

interface ISeasonCardProps {
  season: ISeason;
}

const SeasonCard: React.SFC<ISeasonCardProps> = ({ season }) => {
  const formattedStartDate = formatSeasonDate(season.startDate);
  const formattedEndDate = formatSeasonDate(season.endDate);
  return (
    <Card
      title={season.name}
      actions={[<a>Edit</a>, <a>Complete</a>]}
      bordered={false}
      style={{ width: 300 }}
    >
      <Card.Meta
        description={
          <div>
            <div>
              <p>Start Date:</p>
              <p>{formattedStartDate}</p>
            </div>
            <div>
              <p>End Date:</p>
              <p>{formattedEndDate}</p>
            </div>
          </div>
        }
      />
    </Card>
  );
};

export default SeasonCard;
