import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import isNaN from "lodash/isNaN";
import { User } from "../../types";
import { getGender } from "../../lib/util";
import useProfile from "../../hooks/useProfile";
import Input from "../common/Input";
import Button from "../common/Button";
import useUser from "../../hooks/useUser";

interface IProps {
  profile: User["profile"];
  id: User["id"];
}

const Profile: React.FC<IProps> = ({ profile, id }) => {
  const [userAge, setUserAge] = useState(profile?.age ? `${profile.age}` : "");
  const [usergender, setUserGender] = useState(profile?.gender || "MALE");
  const [userinterests, setUserInterests] = useState(profile?.interests || "");
  const [userfavoriteBook, setUserFavoriteBook] = useState(profile?.favoriteBook || "");
  const [userbio, setUserBio] = useState(profile?.bio || "");
  const { editProfileMutation } = useProfile();
  const { user } = useUser();
  const [editShow, setEditShow] = useState(false);

  const toggleEditButton = () => {
    setEditShow(!editShow);
  };

  /**
   * * 입력값이 올바른지 확인하기
   */
  const validateInputs = () => {
    try {
      if (isNaN(parseInt(userAge, 10))) {
        throw Error("숫자를 입력해 주세요");
      }
      return true;
    } catch (e) {
      alert(e.message);
      return false;
    }
  };

  return (
    <div className="userinfo-profile-note">
      <div role="button" onClick={() => toggleEditButton()} className="editButton">
        {!editShow ? (
          <>{!!user && id === user.id && "프로필 수정하기"}</>
        ) : (
          <Button
            color="green"
            onClick={() => {
              if (validateInputs()) {
                editProfileMutation({
                  variables: {
                    age: parseInt(userAge, 10),
                    gender: usergender,
                    interests: userinterests,
                    favoriteBook: userfavoriteBook,
                    bio: userbio
                  }
                })
                  .then(() => {
                    alert("정보를 수정하였습니다.");
                    window.location.href = `/me/${id}`;
                  })
                  .catch(() => {
                    window.location.href = `/me/${id}`;
                  });
              }
            }}
          >
            수정완료
          </Button>
        )}
      </div>
      <div className="Input-Wrapper">
        <p>나이:{!editShow && profile?.age}</p>
        {editShow && (
          <Input
            className="Input"
            color="transparent"
            value={userAge}
            type="text"
            onChange={e => setUserAge(e.target.value)}
            placeholder="나이를 입력해주세요"
          />
        )}
      </div>
      <div className="Input-Wrapper">
        <p>성별:{!editShow && getGender(profile?.gender)}</p>
        {editShow && (
          <div className="Input">
            <input
              type="radio"
              name="gener"
              value="남"
              checked={usergender === "MALE"}
              onClick={() => setUserGender("MALE")}
              onChange={() => {}}
            />
            남
            <input
              type="radio"
              name="gener"
              value="여"
              checked={usergender === "FEMALE"}
              onClick={() => setUserGender("FEMALE")}
              onChange={() => {}}
            />
            여
          </div>
        )}
      </div>
      <div className="Input-Wrapper">
        <p>흥미:{!editShow && profile?.interests}</p>
        {editShow && (
          <Input
            className="Input"
            color="transparent"
            value={userinterests}
            type="text"
            onChange={e => setUserInterests(e.target.value)}
            placeholder="취미를 입력해주세요"
          />
        )}
      </div>
      <div className="Input-Wrapper">
        <p>좋아하는 책:{!editShow && profile?.favoriteBook}</p>
        {editShow && (
          <Input
            className="Input"
            color="transparent"
            value={userfavoriteBook}
            type="text"
            onChange={e => setUserFavoriteBook(e.target.value)}
            placeholder="좋아하는 책을 입력해주세요."
          />
        )}
      </div>
      <div className="Input-Wrapper text-area-wrapper">
        <p>자기소개:{!editShow && profile?.bio}</p>
        {editShow && (
          <TextareaAutosize
            color="transparent"
            className="text-area-Input"
            value={userbio}
            type="text"
            onChange={e => setUserBio(e.target.value)}
            placeholder="자기소개 해주세요."
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
