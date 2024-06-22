import React, {useEffect } from 'react';
import { incomeCategories, expenseCategories } from '../constants/categories';
import { isValid, format } from 'date-fns';
import {parseDatePhrase} from '../utils/dateParser';
import useStyles from './speechRecognitionStyles';

const SpeechRecognition = ({ formData, setFormData, setSpokenText, createTransaction}) => {
    const classes = useStyles();

    let recognition;

    const handleSpeechRecognition = () => {
        if (recognition) {
            recognition.start();
        } else {
            console.error('Speech recognition is not supported in this browser.');
        }
    };

    

    useEffect(() => {
        if ('SpeechRecognition' in window) {
            recognition = new window.SpeechRecognition();
        } else if ('webkitSpeechRecognition' in window) {
            recognition = new window.webkitSpeechRecognition();
        } else {
            console.error('Speech recognition is not supported in this browser.');
            return;
        }

        recognition.lang = 'en-US';

        recognition.onstart = () => {
            setSpokenText('');
        };

        recognition.onresult = (event) => {
            let interimSpokenText = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    setSpokenText(prevSpokenText => prevSpokenText + event.results[i][0].transcript.trim().toUpperCase());
                } else {
                    interimSpokenText += event.results[i][0].transcript.trim();
                }
            }

            const speechResult = event.results[0][0].transcript.trim();
            

            const keywords = speechResult.toLowerCase().split(' ');
            let updatedFormData = { ...formData };

            keywords.forEach(keyword => {
                // Check for income categories
                incomeCategories.forEach(category => {
                    if (keyword.includes(category.type.toLowerCase())) {
                        updatedFormData.type = 'Income';
                        updatedFormData.category = category.type;
                    }
                });

                // Check for expense categories
                expenseCategories.forEach(category => {
                    if (keyword.includes(category.type.toLowerCase())) {
                        updatedFormData.type = 'Expense';
                        updatedFormData.category = category.type;
                    }
                });

                if (keyword.includes('amount')) {
                    const amountIndex = keywords.indexOf('amount');
                    if (amountIndex !== -1 && amountIndex + 1 < keywords.length) {
                        const amount = keywords[amountIndex + 1];
                        updatedFormData.amount = amount;
                    }
                }
                
                if (keyword.includes('date') && keywords.indexOf(keyword) + 1 < keywords.length) {
                    const nextWord = keywords[keywords.indexOf(keyword) + 1];
                    const parsedDate = parseDatePhrase(nextWord, keywords);
                    if (isValid(parsedDate)) {
                        updatedFormData.date = format(parsedDate, 'yyyy-MM-dd');
                    }
                }

                if (keyword.includes('create')) {
                    createTransaction();
                    updatedFormData.type = '';
                    updatedFormData.category = '';
                    updatedFormData.amount = ''; 
                    return; 
                }
                
            });

        
            setFormData(updatedFormData);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
        };

        return () => {
            if (recognition) {
                recognition.abort();
            }
        };
    }, [formData, setFormData, setSpokenText, createTransaction]);

    return (
        <div className={classes.buttonDiv}>
            <button onClick={handleSpeechRecognition} className={classes.speakButton} ><i class="fa-solid fa-microphone"></i></button>
        </div> 
        
        
    );
};

export default SpeechRecognition;