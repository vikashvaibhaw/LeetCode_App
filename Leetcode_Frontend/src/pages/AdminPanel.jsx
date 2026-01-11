import {useForm,useFieldArray} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {z} from 'zod'
import axiosClient from '../utils/axiosClient'
import { useNavigate } from 'react-router'

//Zod schema matching the problem schema

const problemSchema = z.object({
    title:z.string().min(1,'title is required'),
    description:z.string().min(1,'description is required'),
    difficulty:z.enum(['easy','medium','hard']),
    tags:z.enum(['array','linkedList','graph','dynamicProgramming']),
    visibleTestCases:z.array(
        z.object({
            input:z.string().min(1,'input is required'),
            output:z.string().min(1,'output is required'),
            explanation:z.string().min(1,'explanation is required')
        })
    ).min(1,'at least one visible test is required'),
    hiddenTestCases:z.array(
        z.object({
            input:z.string().min(1,'input is required'),
            output:z.string().min(1,'output is required')
        })
    ).min(1,'at least one hidden test is required'), 
    startCode:z.array(
        z.object({
            language:z.enum(['C++','Java','JavaScript']),
            initialCode:z.string().min(1,'initial Code is required')
        })
    ).length(3,'All three languages are required')
});

function AdminPanel(){
    const navigate=useNavigate();
    const{
        register,
        control,
        handleSubmit,
        formState:{errors}
    }=useForm({
        resolver:zodResolver(problemSchema),
        defaultValues:{
            startCode:[
                {language:'C++',initialCode:''},
                {language:'Java',initialCode:''},
                {language:'JavaScript',initialCode:''},
            ],
            referenceSolution:[
                {language:'C++',initialCode:''},
                {language:'Java',initialCode:''},
                {language:'JavaScript',initialCode:''},
            ],
        }
    })
}