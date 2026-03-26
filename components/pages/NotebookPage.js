import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Dimensions } from 'react-native';
import { saveNotes, loadNotes } from '../Storage';

export const defaultNotesTemplate = 'Type Here . . .'; // Exporting so we can save this template in storage.js
const { width } = Dimensions.get('window');

const NotebookPage = ({ navigation }) => {
    const [title, setTitle] = useState('Notes');
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [lines, setLines] = useState([{ text: defaultNotesTemplate, isEditing: false }]);

    useEffect(() => {
        const fetchNotes = async () => {
            const savedNotes = await loadNotes();
            if (savedNotes) {
                setTitle(savedNotes.title || 'Notes');

                if (savedNotes.lines && Array.isArray(savedNotes.lines))
                    setLines(savedNotes.lines.map(line => ({ ...line, isEditing: false })));
            }
        };

        fetchNotes();
    }, []);

    const handleTitleBlur = async () => {
        await saveNotes({ title, lines: lines.map(({ text }) => ({ text })) });
    };

    const handleLineInput = (index) => {
        const newLines = [...lines];
        newLines[index].isEditing = !newLines[index].isEditing;

        if (newLines[index].isEditing && newLines[index].text == defaultNotesTemplate) {
            newLines[index].text = '';
        }

        setLines(newLines);
    };

    const handleLineChange = (text, index) => {
        const newLines = [...lines];
        newLines[index].text = text;
        setLines(newLines);
    };

    const handleBlur = async (index) => {
        const newLines = [...lines];

        if (newLines[index].text === undefined || newLines[index].text.trim() === '') {
            newLines[index].text = defaultNotesTemplate;
        }

        newLines[index].isEditing = false;
        setLines(newLines);

        await saveNotes({ title, lines: newLines.map(({ text }) => ({ text })) });
    }

    return (
        <ScrollView style={styles.container}>
            {isEditingTitle ? (
                <TextInput
                    style={styles.titleInput}
                    value={title}
                    onChangeText={newTitle => setTitle(newTitle)}
                    onBlur={() => { 
                        handleTitleBlur();
                        setIsEditingTitle(false);
                    }}
                    autoFocus
                />
            ) : (
                <TouchableOpacity onPress={() => setIsEditingTitle(true)}>
                    <Text style={styles.title}>{title}</Text>
                </TouchableOpacity>
            )}

            <View style={styles.title_line} />

            {lines.map((line, index) => {
                return (
                    <View key={index} style={styles.text_container}>
                        {line.isEditing ? (
                            <TextInput
                                style={styles.line_input}
                                value={line.text}
                                onChangeText={(text) => handleLineChange(text, index)}
                                onBlur={() => handleBlur(index)}
                                autoFocus
                                multiline
                                textAlignVertical='top'
                            />
                        ) : (
                            <TouchableOpacity onPress={() => handleLineInput(index)}>
                                <Text style={styles.line_text}>{line.text}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                );
            })}
        </ScrollView>
    );
};

const sharedTitleStyles = {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
};

const sharedLineStyles = {
    fontSize: 18,
    color: 'black',
    paddingHorizontal: 10,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#088d6569',
    },

    title: {
        ...sharedTitleStyles,
    },

    titleInput: {
        ...sharedTitleStyles,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        padding: 5,
    },

    title_line: {
        width: width * 0.9,
        height: 2,
        alignSelf: 'center',
        backgroundColor: '#000',
    },

    text_container: {
        flex: 1,
        display: 'flex',
        padding: 5,
    },  

    line_text: {
        ...sharedLineStyles,
    },

    line_input: {
        ...sharedLineStyles,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        padding: 5,
    },

    line: {
        width: width * 0.9,
        height: 2,
        alignSelf: 'center',
        backgroundColor: '#000',
    },
});

export default NotebookPage;