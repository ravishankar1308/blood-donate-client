import React, {useContext, useState} from 'react';
import {Text, View, StyleSheet, TextInput, Button} from 'react-native';
import {Context} from "../../context/BlogContext";
import BlogForm from "../../components/BlogForm";

const EditScreen = ({navigation}) => {

    const _id = navigation.getParam('_id');

    const {getBlogPost,editBlogsPost, state} = useContext(Context);

    const blogPost = state.find((blogPost) => blogPost._id === _id);


    const blog = navigation.getParam('_id');

    const onSubmit = (title,content) => {

        editBlogsPost(title,content,_id,
            () => {
            console.log(_id);
            getBlogPost();
           navigation.pop();
        }
        );
    };

    return <View>
        <BlogForm
            initialValues={{title: blogPost.title, content: blogPost.content}}
            onSubmit={onSubmit}
        />
    </View>
};

const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'black',
        padding: 5,
        margin: 5
    },
    label: {
        fontSize: 20,
        marginBottom: 5,
    }


});

export default EditScreen;