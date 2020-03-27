import React from "react";
import styled from "styled-components";
import { User } from "../../types";

interface IProps {
  profile: User["profile"];
}

const Profile: React.FC<IProps> = ({ profile }) => {
  return (
    <div className="userinfo-profile-note">
      <p>나이:{profile?.age}</p>
      <p>성별:{genderTranslation(profile.gender)}</p>
      <p>흥미:{profile?.interests}</p>
      <p>좋아하는 책:{profile?.favoriteBook}</p>
      <p>자기소개:{profile?.bio}</p>
    </div>
  );
};

export default Profile;
