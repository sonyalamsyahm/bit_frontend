import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList, Dimensions} from 'react-native';
import {Header, Item, Input} from 'native-base';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {PulseIndicator} from 'react-native-indicators';
import {Button} from 'react-native-elements';
import Modal from 'react-native-modal';

import fetchAllData from '../../_store/todoList';
import {
  GET_METHOD,
  PUT_METHOD,
  DELETE_METHOD,
  ADD_METHOD,
} from '../../config/constans';

class AllList extends Component {
  constructor() {
    super();
    this.state = {
      isAdd: false,
      todo: '',
      conditionEdit: false,
      nameEditing: '',
      id: null,
      conditionComplete: false,
    };
  }

  componentDidMount() {
    this.handleGetData();
  }

  handleGetData = () => {
    this.props.fetchAllData(GET_METHOD, null, null);
  };

  header = () => {
    return (
      <Header androidStatusBarColor="rgb(141, 90, 184)" style={styles.header}>
        <Text style={styles.text}>All To Do List</Text>
      </Header>
    );
  };

  validationCheckBoc = async (name, completed, id) => {
    let setCompleted;
    if (completed) {
      setCompleted = false;
    } else {
      setCompleted = true;
    }
    const params = {
      name,
      setCompleted,
    };
    // console.log(params.setCompleted);
    await this.props.fetchAllData(PUT_METHOD, params, id);
    // alert('Checkbox changed');
    await this.handleGetData();
  };

  iconCheck = (name, completed, id) => {
    // const {data} = this.props.todos;
    // console.log(JSON.stringify(data));
    if (completed)
      return (
        <Icon
          name="check-box-outline"
          size={30}
          onPress={() => this.validationCheckBoc(name, completed, id)}
        />
      );
    else
      return (
        <Icon
          name="checkbox-blank-outline"
          size={30}
          onPress={() => this.validationCheckBoc(name, completed, id)}
        />
      );
  };

  handleDelete = async id => {
    await this.props.fetchAllData(DELETE_METHOD, null, id);
    await this.handleGetData();
  };

  renderingList = (name, completed, id) => {
    return (
      <View style={styles.viewRenderMain}>
        {this.iconCheck(name, completed, id)}
        {/* <Icon name="check-box-outline" size={30} /> */}
        <View style={styles.viewRenderSecond}>
          <Text style={styles.name}>{name}</Text>
          <View style={{flexDirection: 'row', marginRight: 30}}>
            <Icon
              name="pencil"
              size={25}
              style={{marginRight: 5}}
              onPress={() =>
                this.setState({
                  isAdd: true,
                  conditionEdit: true,
                  nameEditing: name,
                  id: id,
                  conditionComplete: completed,
                })
              }
            />
            <Icon
              name="trash-can-outline"
              size={25}
              onPress={() => this.handleDelete(id)}
            />
          </View>
        </View>
      </View>
    );
  };

  list = datas => {
    return (
      <FlatList
        data={datas}
        renderItem={({item}) =>
          this.renderingList(item.name, item.completed, item._id)
        }
        keyExtractor={item => item._id}
      />
    );
  };

  buttonAdd = () => {
    return (
      <Button
        buttonStyle={{backgroundColor: 'rgba(141, 90, 184,0.8)'}}
        title="Add New Todo"
        titleStyle={{color: 'black', fontSize: 18}}
        onPress={() => this.setState({isAdd: true})}
      />
    );
  };

  editData = async () => {
    const {conditionComplete, id, todo} = this.state;
    const params = {
      name: todo,
      setCompleted: conditionComplete,
    };
    await this.props.fetchAllData(PUT_METHOD, params, id);
    await this.handleGetData();
    this.setState({isAdd: false, todo: '', conditionEdit: false});
  };

  validationAction = conditionEdit => {
    const {todo} = this.state;
    // console.log(conditionEdit);
    if (!todo) {
      alert('data cannot be empty');
    }
    if (!conditionEdit) {
      this.addData();
    } else if (conditionEdit) {
      this.editData();
    }
  };

  addData = async () => {
    const {todo} = this.state;
    await this.props.fetchAllData(ADD_METHOD, todo, null);
    await this.handleGetData();
    this.setState({isAdd: false, todo: ''});
  };

  showModal = () => {
    const {isAdd, conditionEdit, nameEditing} = this.state;
    const placeholder = conditionEdit ? nameEditing : null;
    return (
      <Modal isVisible={isAdd}>
        <View
          style={{
            backgroundColor: 'white',
            justifyContent: 'center',
            padding: 20,
            borderRadius: 5,
          }}>
          <Text style={styles.text}>New To Do</Text>
          <Item regular style={{height: 40, marginTop: 5, marginBottom: 10}}>
            <Input
              onChangeText={text => this.setState({todo: text})}
              placeholder={placeholder}
            />
          </Item>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button
              title="Save"
              buttonStyle={[
                styles.btn,
                {backgroundColor: 'rgba(141, 90, 184,0.8)'},
              ]}
              onPress={() => this.validationAction(conditionEdit)}
            />
            <Button
              onPress={() =>
                this.setState({isAdd: false, conditionEdit: false})
              }
              title="Cancel"
              buttonStyle={[
                styles.btn,
                {
                  backgroundColor: 'rgb(214, 92, 84)',
                  marginLeft: 20,
                },
              ]}
            />
          </View>
        </View>
      </Modal>
    );
  };

  render() {
    const {todos} = this.props;

    if (todos.isLoading) {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <PulseIndicator color="rgba(141, 90, 184,0.8)" />
        </View>
      );
    }
    if (todos.error) {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text>Error</Text>
        </View>
      );
    }
    // console.log(JSON.stringify(todos.data, null, 2));
    return (
      <View>
        {this.header()}
        {this.list(todos.data)}
        <View style={styles.btnView}>{this.buttonAdd()}</View>
        {this.showModal()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todoList,
});

const mapDispatchToProps = {
  fetchAllData,
};

export default connect(mapStateToProps, mapDispatchToProps)(AllList);

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  header: {
    backgroundColor: 'rgba(141, 90, 184,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
  name: {
    fontSize: 20,
  },
  viewRenderMain: {
    marginLeft: 5,
    marginRight: 10,
    marginTop: 15,
    flexDirection: 'row',
    borderBottomColor: 'purple',
    borderBottomWidth: 2,
  },
  viewRenderSecond: {
    width: Dimensions.get('window').width - 20,
    marginLeft: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnView: {
    marginTop: 10,
    marginHorizontal: 5,
  },
  btn: {
    height: 30,
    width: 80,
  },
});
