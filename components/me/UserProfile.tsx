import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { User } from "../../types";
import { getGender } from "../../lib/util";
import useProfile from "../../hooks/useProfile";
import Input from "../common/Input";
import Button from "../common/Button";

interface IProps {
  profile: User["profile"];
  id: User["id"];
}

const Profile: React.FC<IProps> = ({ profile, id }) => {
  // const [username, setUsername] = useState("");
  const [userAge, setUserAge] = useState("");
  const [usergender, setUserGender] = useState("");
  const [userinterests, setUserInterests] = useState("");
  const [userfavoriteBook, setUserFavoriteBook] = useState("");
  const [userbio, setUserBio] = useState("");
  const { editProfileMutation } = useProfile();

  const [editShow, setEditShow] = useState(false);

  const toggleEditButton = () => {
    setEditShow(!editShow);
  };

  const genderTrans = () => {
    switch (usergender) {
      case "남":
        return "MALE";
      case "male":
        return "MALE";
      case "Male":
        return "MALE";
      case "여":
        return "FEMALE";
      case "female":
        return "FEMALE";
      case "Female":
        return "FEMALE";
      default:
        return "MALE";
    }
  };

  return (
    <div className="userinfo-profile-note">
      <div role="button" onClick={() => toggleEditButton()} className="editButton">
        {!editShow ? (
          "...edit"
        ) : (
          <Button
            color="green"
            onClick={() => {
              editProfileMutation({
                variables: {
                  age: userAge,
                  gender: genderTrans(),
                  interests: userinterests,
                  favoriteBook: userfavoriteBook,
                  bio: userbio
                }
              })
                .then(() => {
                  alert("정보를 수정하였습니다.");
                  window.location.href = `/me/${id}`;
                })
                .catch(e => {
                  alert(e.message);
                });
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
          <Input
            className="Input"
            color="transparent"
            value={usergender}
            type="text"
            onChange={e => setUserGender(e.target.value)}
            placeholder="성별을 입력해주세요(ex. 남 or 여)"
          />
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
      <div className="Input-Wrapper">
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
