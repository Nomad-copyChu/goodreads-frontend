import React from "react";
import Link from "next/link";
import { User } from "../../types";
import { getGender } from "../../lib/util";

interface IProps {
  profile: User["profile"];
  id?: User["id"];
}

const Profile: React.FC<IProps> = ({ profile, id }) => {
  return (
    <div className="userinfo-profile-note">
      <p>나이:{profile?.age}</p>
      <p>성별:{getGender(profile?.gender)}</p>
      <p>흥미:{profile?.interests}</p>
      <p>좋아하는 책:{profile?.favoriteBook}</p>
      <p>자기소개:{profile?.bio}</p>
    </div>
  );
};

export default Profile;
