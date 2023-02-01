import styled from 'styled-components';
 
export const Container = styled.View`
 // flex: .9;
 padding-left: 10px;
 padding-right: 10px;
 align-items: center;
 height:94.9%;
 background-color: #ffffff;
`;
 
export const Card = styled.TouchableOpacity`
 width: 100%;
`;
 
export const UserInfo = styled.View`
 flex-direction: row;
 justify-content: space-between;
 // background-color: #F7F7F7;
 border-color:#E3E7EB;
 border-radius: 10px;
 border-width:1px;
`;
 
export const UserImgWrapper = styled.View`
 padding-top: 15px;
 padding-bottom: 15px;
 left:15px;
`;
 
export const UserImg = styled.Image`
 width: 50px;
 height: 50px;
 border-radius: 25px;
`;
 
export const TextSection = styled.View`
 flex-direction: column;
 justify-content: center;
 padding: 15px;
 padding-left: 0;
 margin-left: 10px;
 width: 300px;
 left:15px;
 // border-bottom-width: 1px;
 border-bottom-color: #cccccc;
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
 color: #000000;
 position: absolute;
`;
 
export const PostTime = styled.Text`
font-size: 11px;
color: #666;
height: 20px;
// width: 38%;
// background-color:red;
left:670%;
font-family: 'Lato-Regular';
 `;
 
export const MessageText = styled.Text`
 font-size: 14px;
 color: #5B5B5B;
`;
 
export const Message1Text = styled.Text`
 font-size: 14px;
 font-weight: bold;
 color: #333333;
`;
 
 

