import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { User } from "../../types";
import { getGender } from "../../lib/util";
import useProfile from "../../hooks/useProfile";
import Input from "../common/Input";
import Button from "../common/Button";

interface IProps {
  profile: User["profile"];
}

const Profile: React.FC<IProps> = ({ profile }) => {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState("");
  const [favoriteBook, setFavoriteBook] = useState("");
  const { editProfileMutation } = useProfile();

  const [editShow, setEditShow] = useState(false);

  const toggleEditButton = () => {
    setEditShow(!editShow);
  };

  return (
    <div className="userinfo-profile-note">
      <div role="button" onClick={() => toggleEditButton()} className="editButton">
        {!editShow ? (
          "...edit"
        ) : (
          <Button
            color="green"
            onClick={async () => {
              try {
                await editProfileMutation();
              } catch (e) {
                alert(e.message);
              }
            }}
          >
            수정완료
          </Button>
        )}
      </div>

      <div className="Input-Wrapper">
        <p>이름:{!editShow && profile?.username}</p>
        {editShow && (
          <Input
            className="Input"
            color="transparent"
            value={username}
            type="text"
            onChange={e => setUsername(e.target.value)}
            placeholder="이름을 입력해주세요"
          />
        )}
      </div>
      <div className="Input-Wrapper">
        <p>나이:{!editShow && profile?.age}</p>
        {editShow && (
          <Input
            className="Input"
            color="transparent"
            value={age}
            type="text"
            onChange={e => setAge(e.target.value)}
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
            value={gender}
            type="text"
            onChange={e => setGender(e.target.value)}
            placeholder="성별을 입력해주세요(ex. MALE or FEMALE)"
          />
        )}
      </div>
      <div className="Input-Wrapper">
        <p>흥미:{!editShow && profile?.interests}</p>
        {editShow && (
          <Input
            className="Input"
            color="transparent"
            value={interests}
            type="text"
            onChange={e => setInterests(e.target.value)}
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
            value={favoriteBook}
            type="text"
            onChange={e => setFavoriteBook(e.target.value)}
            placeholder="좋아하는 책을 입력해주세요."
          />
        )}
      </div>
      <div className="Input-Wrapper">
        <p>자기소개:{!editShow && profile?.bio}</p>
        {editShow && (
          <TextareaAutosize
            color="transparent"
            value={bio}
            type="text"
            onChange={e => setBio(e.target.value)}
            placeholder="자기소개 해주세요."
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
