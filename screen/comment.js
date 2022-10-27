import React, {Component} from 'react';

import {
  Easing,
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View,
  Animated,
  NativeModules,
  Platform,
  Dimensions,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';

import StringUtils from '../utils/stringutils';

import Svg, {G, Path} from 'react-native-svg';

import moment from 'moment';

const emojiUnicode = require('emoji-unicode');

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const URL_TEMP = 'http://18.181.88.243:8081/Temp';

class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ui: [],
      title: '',
      tableOpacity: 0,
      loadingOpacity: 1,
      showLoading: true,
      comments: [],
      commentId: '',
      isChild: 0,
      comment: '',
      replyText: global.locale == 'en' ? 'Reply' : '返事',
      likeText: global.local == 'en' ? 'Likes' : 'いいね',
      saveComment: global.local == 'en' ? 'Save' : 'いいね',
      cancelSaveComment: global.local == 'en' ? 'Cancel' : 'キャンセル',
      refresh: 0,
      commentEdit: '',
    };

    // this.getUI = this.getUI.bind(this);

    this.goBack = this.goBack.bind(this);

    this.renderCell = this.renderCell.bind(this);

    this.saveComment = this.saveComment.bind(this);

    this.onEndReached = this.onEndReached.bind(this);

    this.editComment = this.editComment.bind(this);

    this.deleteComment = this.deleteComment.bind(this);

    this.continueSaveComment = this.continueSaveComment.bind(this);

    this.cancelSaveComment = this.cancelSaveComment.bind(this);

    this.replyToComment = this.replyToComment.bind(this);

    this.showCaptureImage = this.showCaptureImage.bind(this);

    this.like = this.like.bind(this);

    this.textComment = null;
  }

  componentDidMount() {
    this.getPostComments();
  }

  like(commentId) {
    let comments = this.state.comments;

    let like = 0;

    for (var i = 0; i < comments.length; i++) {
      if (comments[i].comment_id == commentId) {
        if (parseInt(comments[i].user_liked) == 0) {
          like = 1;
          comments[i].user_liked = 1;
        } else {
          like = 0;
          comments[i].user_liked = 0;
        }

        break;
      }
    }

    this.setState({
      refresh: 1,
      comments: comments,
    });

    global.socket.on('likecomment', function (ret) {
      global.socket.off('likecomment');
    });

    let params = {
      uuid: global.deviceid,
      userid: global.user_id,
      locale: global.locale,
      commentid: commentId,
      liked: like,
    };

    global.socket.emit('likecomment', params);
  }

  continueSaveComment(commentId) {
    let comments = this.state.comments;

    let isChild = '0';

    for (var i = 0; i < comments.length; i++) {
      if (comments[i].comment_id == commentId) {
        comments[i].comment = this.state.commentEdit;
        comments[i].isediting = '0';
        isChild = comments[i].ischild;

        break;
      }
    }

    this.setState({
      commentEdit: '',
      refresh: 1,
      comments: comments,
    });

    let self = this;

    global.socket.on('post_comments_update', function (ret) {
      global.socket.off('post_comments_update');
    });

    let params = {
      locale: global.locale,
      uuid: global.deviceid,
      userid: global.user_id,
      user_id: global.user_id,
      ischild: isChild,
      comment_id: commentId,
      post_id: global.commentPostId,
      created: '',
      comment: StringUtils.convertEmoji(this.state.commentEdit),
      profile_image: '',
      name: global.nickname,
      istemp: 1,
      parent_id: '',
      expanded: 1,
    };

    console.log(params);

    global.socket.emit('post_comments_update', params);
  }

  replyToComment(commentId) {
    this.setState({
      commentId: commentId,
    });

    this.textComment.focus();
  }

  cancelSaveComment(commentId) {
    let comments = this.state.comments;

    for (var i = 0; i < comments.length; i++) {
      if (comments[i].comment_id == commentId) {
        comments[i].isediting = '0';

        this.setState({
          commentEdit: comments[i].comment,
        });

        break;
      }
    }

    this.setState({
      commentEdit: '',
      refresh: 1,
      comments: comments,
    });
  }

  editComment(commentId) {
    let comments = this.state.comments;

    for (var i = 0; i < comments.length; i++) {
      if (comments[i].comment_id == commentId) {
        comments[i].isediting = '1';

        this.setState({
          commentEdit: comments[i].comment,
        });

        break;
      }
    }

    this.setState({
      comments: comments,
      refresh: 1,
    });
  }

  deleteComment(commentId, idReal) {
    let self = this;

    global.deletedCommentId = idReal;

    global.socket.on('deletecomment', function (ret) {
      global.socket.off('deletecomment');

      self.getPostComments();

      global.GLComponent.deletePostsComments();
    });

    let params = {
      uuid: global.deviceid,
      userid: global.user_id,
      locale: global.locale,
      commentid: commentId,
    };

    global.socket.emit('deletecomment', params);
  }

  showCaptureImage(i) {
    if (i != 2) {
      global.captureType = i;

      global.GLComponent = this.props.gl;

      this.props.gl.gotoCaptureImage();
    } else {
      global.captureType = i;

      this.props.gl.gotoPhotoLibrary();
    }
  }

  //   getUI() {
  //     let self = this;

  //     global.socket.on('ui', function (ret) {
  //       global.socket.off('ui');

  //       self.setState(
  //         {
  //           ui: ret,
  //           title: ret[0].ui,
  //         },
  //         () => {
  //           self.getPostComments();
  //         },
  //       );
  //     });

  //     let params = {locale: global.locale, type: '32'};

  //     global.socket.emit('ui', params);
  //   }

  getPostComments() {
    let self = this;

    global.socket.on('emit-post-comments', function (ret) {
      global.socket.off('emit-post-comments');
    //   alert(JSON.stringify(ret));
    //   console.log(ret);

      self.setState(
        {
          ret: ret,
          comment: ret.comment,
          commentid: ret.commentid,
          datetime: ret.datetime,
          nickname: ret.nickname,
          userid: ret.userid,
          path:ret.path,
          file:ret.file,
        },
        () => {
          self.setState({
            showLoading: false,
          });
        },
      );
    });

    let params = {}

    params['nickname'] = global.nickname;
    params['postid'] = global.postid;
    params['comment'] = this.state.comment;
    params['commentid'] = this.state.commentid;
    params['datetime'] = this.state.datetime;
    params['file'] = this.state.file;
    params['path'] = this.state.path;

    global.socket.emit('on-post-comments', params);
  }

  saveComment() {
    let self = this;

    global.socket.on('emit-comment-save', function (ret) {
      global.socket.off('emit-comment-save');

      //   global.GLComponent.savePostsComments(ret, self.state.comment);

      self.setState({
        commentid: '',
        comment: ret.comment,
        postid: ret.postid,
        // datetime:datetime,
        socketid: ret.socketid,
      });

      self.getPostComments();
    });

    //["uuid" : GlobalVariables.UUID, "userid" : GlobalVariables.USER_ID, "user_id" : GlobalVariables.USER_ID,"ischild" : String(intIsChild), "comment_id" : strCommentId, "post_id" : strPostId, "created" : "", "comment" : strComment, "profile_image" : "", "name" : "Mark", "istemp" : "1", "parent_id" : "", "expanded" : "1"]

    let params = {
      //   locale: global.locale,
      //   uuid: global.deviceid,
      //   userid: global.user_id,
      //   user_id: global.user_id,
      //   ischild: this.state.isChild,
      commentid: this.state.commentid,
      postid: global.postid,
      // socketid:this.state.socketid,
      comment: StringUtils.convertEmoji(this.state.comment),
      profile_image: '',
      name: global.nickname,
      datetime: moment(new Date()).format('YYYY-MM-DD  LT'),
      //   istemp: 1,
      //   parent_id: '',
      //   expanded: 1,
    };

    global.socket.emit('on-comment-save', params);
  }

  goBack() {
    this.props.navigation.push('Post');
  }

  onEndReached() {}

  renderCell({item}) {
    return <CommentCell item={item} self={this} />;
  }

  render() {
    let bottomBarHeight = windowHeight - 80;

    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View
          style={{
            width: '100%',
            backgroundColor: '#f8f8f9',
            height: windowHeight / 12,
            flexDirection: 'row',
          }}>
          <Text
            style={{
              position: 'absolute',
              width: '100%',
              height: 30,
              lineHeight: 32,
              textAlign: 'center',
              fontSize: 13,
              marginTop: windowHeight / 10 - 35,
              fontWeight: 'bold',
              color: '#FFF',
            }}>
            {this.state.title}
          </Text>

          <TouchableOpacity
            style={{
              marginLeft: 10,
              marginTop: windowHeight / 10 - 65,
              width: 50,
              height: 30,
            }}
            onPress={() => this.goBack()}>
            <Svg
              style={{width: 20, height: 30}}
              aria-hidden="true"
              focusable="false"
              data-prefix="fal"
              data-icon="angle-left"
              class="svg-inline--fa fa-angle-left fa-w-6"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 192 512">
              <Path
                fill="black"
                d="M25.1 247.5l117.8-116c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L64.7 256l102.2 100.4c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L25 264.5c-4.6-4.7-4.6-12.3.1-17z"></Path>
            </Svg>
          </TouchableOpacity>
        </View>

        {this.state.showLoading ? (
          <View
            style={{
              position: 'absolute',
              width: windowWidth,
              height: windowHeight,
              top: 100,
              left: 0,
            }}>
            <ActivityIndicator
              style={{marginTop: 100}}
              size="small"
              color="#69747f"
            />
          </View>
        ) : (
          <KeyboardAvoidingView
            style={{width: windowWidth, height: windowHeight - 10}}
            behavior="padding">
            <FlatList
              onEndReached={() => this.onEndReached()}
              initialNumToRender={10}
              removeClippedSubviews={true}
              extraData={this.state.refresh}
              style={{width: '100%', height: windowHeight - 200,paddingTop:10}}
              data={this.state.ret}
              renderItem={this.renderCell}
              keyExtractor={item => item.postid}
            />

            <View
              style={{
                width: '100%',
                padding: 10,
                paddingBottom: 30,
                flexDirection: 'row',
                alignItems: 'flex-end',
              }}>
              <TextInput
                ref={ref => {
                  this.textComment = ref;
                }}
                autoFocus={true}
                autoCapitalize={false}
                multiline={true}
                style={{
                  backgroundColor: '#f8f8f9',
                  width: windowWidth - 72,
                  lineHeight: 20,
                  borderRadius: 5,
                  padding: 5,
                  textColor: 'black',
                  fontSize: 13,
                }}
                onChangeText={comment => this.setState({comment})}
                value={this.state.comment}></TextInput>

              <TouchableOpacity
                style={{
                  width: 50,
                  height: 37,
                  marginLeft: 5,
                  backgroundColor: global.buttonColor,
                  borderRadius: 3,
                }}
                onPress={() => this.saveComment()}>
                <Svg
                  style={{
                    marginTop: 6,
                    marginLeft: 14,
                    width: 22,
                    height: 22,
                  }}
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fal"
                  data-icon="paper-plane"
                  class="svg-inline--fa fa-paper-plane fa-w-16"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512">
                  <Path
                    fill="black"
                    d="M464 4.3L16 262.7C-7 276-4.7 309.9 19.8 320L160 378v102c0 30.2 37.8 43.3 56.7 20.3l60.7-73.8 126.4 52.2c19.1 7.9 40.7-4.2 43.8-24.7l64-417.1C515.7 10.2 487-9 464 4.3zM192 480v-88.8l54.5 22.5L192 480zm224-30.9l-206.2-85.2 199.5-235.8c4.8-5.6-2.9-13.2-8.5-8.4L145.5 337.3 32 290.5 480 32l-64 417.1z"></Path>
                </Svg>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        )}
      </View>
    );
  }
}

const CommentCell = ({item, self}) => (
  <View
    style={{
      width:  windowWidth ,
      flexDirection: 'column',
      margin: 5,
      marginLeft:15,
      borderRadius: 3,
      backgroundColor: '#FFF',
    }}>
    <View
      style={{
        width: "100%",
        flexDirection: 'column',
        padding: 1,
      }}>
      <Image
        source={{uri:
            URL_TEMP +
            '/' +
            item.path +
            '/' +
            item.file,
        }}
        style={{width: 60, height: 60, borderRadius: 30}}
        defaultSource={require('../icon/userprofile.png')}
      />
         <Text
          style={{
            marginLeft: 70,
            marginTop: 10,
            bottom:68,
            lineHeight: 15,
            fontSize: 14,
            fontWeight:'bold',
            color: 'black',
          }}>
          {item.nickname}
        </Text>

        <Text
          style={{
            marginLeft: 73,
            marginTop: 10,
            bottom:70,
            lineHeight: 15,
            fontSize: 12,
            color: 'black',
          }}>
          {StringUtils.convertUnicode(item.comment)}
        </Text>
     
   
      <Text
        style={{
          height: 30,
          paddingLeft: 245,
          bottom : 118,
          lineHeight: 30,
          fontSize: 11,
          color: global.textColor,
        }}>
        {item.datetime}
      </Text>

      {item.user_id == global.user_id ? (
        <View
          style={{
            position: 'absolute',
            flexDirection: 'row',
            height: 30,
            width: 60,
            left: item.ischild == '0' ? windowWidth - 75 : windowWidth - 100,
            top: 40,
          }}>
          <TouchableOpacity
            style={{height: 30, marginLeft: 10}}
            onPress={() => self.editComment(item.comment_id)}>
            <Svg
              style={{width: 15, height: 15, marginTop: 7}}
              aria-hidden="true"
              focusable="false"
              data-prefix="fal"
              data-icon="edit"
              class="svg-inline--fa fa-edit fa-w-18"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512">
              <Path
                fill={global.textColor}
                d="M417.8 315.5l20-20c3.8-3.8 10.2-1.1 10.2 4.2V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h292.3c5.3 0 8 6.5 4.2 10.2l-20 20c-1.1 1.1-2.7 1.8-4.2 1.8H48c-8.8 0-16 7.2-16 16v352c0 8.8 7.2 16 16 16h352c8.8 0 16-7.2 16-16V319.7c0-1.6.6-3.1 1.8-4.2zm145.9-191.2L251.2 436.8l-99.9 11.1c-13.4 1.5-24.7-9.8-23.2-23.2l11.1-99.9L451.7 12.3c16.4-16.4 43-16.4 59.4 0l52.6 52.6c16.4 16.4 16.4 43 0 59.4zm-93.6 48.4L403.4 106 169.8 339.5l-8.3 75.1 75.1-8.3 233.5-233.6zm71-85.2l-52.6-52.6c-3.8-3.8-10.2-4-14.1 0L426 83.3l66.7 66.7 48.4-48.4c3.9-3.8 3.9-10.2 0-14.1z"></Path>
            </Svg>
          </TouchableOpacity>

          <TouchableOpacity
            style={{height: 30, marginLeft: 10}}
            onPress={() =>
              self.deleteComment(item.comment_id, item.comment_id_real)
            }>
            <Svg
              style={{width: 15, height: 15, marginTop: 7}}
              aria-hidden="true"
              focusable="false"
              data-prefix="fal"
              data-icon="trash-alt"
              class="svg-inline--fa fa-trash-alt fa-w-14"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512">
              <Path
                fill={global.textColor}
                d="M296 432h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8zm-160 0h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8zM440 64H336l-33.6-44.8A48 48 0 0 0 264 0h-80a48 48 0 0 0-38.4 19.2L112 64H8a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h24v368a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V96h24a8 8 0 0 0 8-8V72a8 8 0 0 0-8-8zM171.2 38.4A16.1 16.1 0 0 1 184 32h80a16.1 16.1 0 0 1 12.8 6.4L296 64H152zM384 464a16 16 0 0 1-16 16H80a16 16 0 0 1-16-16V96h320zm-168-32h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8z"></Path>
            </Svg>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
    </View>
  </View>
);

export default Comment;
