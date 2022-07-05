import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  padding-left: 20px;
  padding-right: 20px;
  align-items: center;
  background-color: #ffffff;
`;

export const Card = styled.View`
  width: 100%;
  right: 53px;
  padding-bottom: 35px;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  top: 50px;
`;

export const UserImgWrapper = styled.TouchableOpacity`
  padding-top: 15px;
  padding-bottom: 15px;
`;

export const UserImg = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  bottom: 12px;
  left: 70px;
`;

export const UserImg1 = styled.Image`
  width: 300px;
  height: 200px;
  border-radius: 25px;
  top: 15px;
  margin-bottom: 25px;
`;

export const UserIcon = styled.Image`
  width: 18px;
  height: 18px;
  border-radius: 25px;
  bottom: 12px;
  left: 5px;
`;

// export const PostsImg = styled.ImageBackground`
//   width: 50px;
//   height: 50px;
//   border-radius: 25px;
// `;

export const TextSection = styled.View`
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  padding-left: 0;
  margin-left: 10px;
  width: 300px;
  border-bottom-width: 1px;
  border-bottom-color: #cccccc;
  padding-bottom: 35px;
`;

export const UserInfoText = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
`;

export const UserName = styled.Text`
  font-size: 14px;
  font-weight: bold;
  font-family: 'Lato-Regular';
  color: #100c08;
  left: 20px;
`;

export const PostTime = styled.Text`
  font-size: 12px;
  color: #666;
  font-family: 'Lato-Regular';
`;

export const MessageText = styled.Text`
  font-size: 14px;
  color: #333333;
`;

export const MessageText1 = styled.Text`
  font-size: 12px;
  left: 25px;
  top: 6px;
  color: #333333;
`;

export const UserInfo1 = styled.TouchableOpacity`
  top: 10px;
  right: 40px;
  background-color: #dddddd;
  margin-horizontal: 117px;
  height: 30px;
  width: 115px;
  border-radius: 4px;
`;

export const Card1 = styled.TouchableOpacity`
  width: 100%;
`;
