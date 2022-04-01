import styled from 'styled-components';

export const InteractionWrapper = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding-bottom: 1px;
  right: 50px;
`;
export const InteractionWrapper1 = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: -40px;
  padding-bottom: 10px;
  left: 20px;
`;
export const Divider = styled.View`
  border-bottom-color: #cdd5d5;
  border-bottom-width: 1px;
  width: 98%;
  align-self: center;
  margin-top: 8px;
`;
export const Divider1 = styled.View`
  border-bottom-color: #cdd5d5;
  border-bottom-width: 1px;
  width: 98%;
  align-self: center;
  margin-bottom: 0px;
  padding-bottom: 1px;
`;
export const Divider2 = styled.View`
  border-bottom-color: #cdd5d5;
  border-bottom-width: 1px;
  width: 98%;
  align-self: center;
  margin-bottom: 0px;
  padding-bottom: 1px;
  margin-top: 10px;
`;
export const Interaction = styled.TouchableOpacity`
  flex-direction: row;
  right: 270px;
  justify-content: center;
  border-radius: 5px;
  padding: 5px 10px;
  background-color: ${props => (props.active ? '#2e64e515' : 'transparent ')};
`;
export const Interaction1 = styled.TouchableOpacity`
  flex-direction: row;
  left: 100px;
  padding-top: 1px;
  justify-content: center;
  margin-bottom: 0px;
  border-radius: 5px;
  padding: 5px 10px;
  background-color: ${props => (props.active ? '#2e64e515' : 'transparent ')};
`;

export const InteractionText = styled.Text`
  font-size: 18px;
  font-family: 'Lato-Regular';
  font-weight: bold;
  color: ${props => (props.active ? '#2e64e5' : '#333')};
  margin-top: 5px;
  margin-left: 4px;
`;
export const Container = styled.View`
  height: 100%;
  width: 95%;
  align-items: center;
  align-self: center;
  background-color: #fff;
  padding: 10px;
`;

export const Card = styled.View`
  background-color: #f8f8f8;
  width: 100%;
  height: 10%;
  margin-top: 30px;
  margin-bottom: 5px;
`;
