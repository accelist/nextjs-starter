import { WithDefaultLayout } from "@/components/DefautLayout";
import { Title } from "@/components/Title";
import { Page } from "@/types/Page";
import { Button, Checkbox, DatePicker, Input, InputNumber, Radio, Rate, Select, Upload } from "antd";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs, { type Dayjs } from "dayjs";
import { UploadOutlined } from '@ant-design/icons';

const foods = [
    {
        label: 'Nasi Goreng',
        value: 'Nasi Goreng'
    },
    {
        label: 'Nasi Padang',
        value: 'Nasi Padang'
    },
    {
        label: 'Nasi Campur',
        value: 'Nasi Campur'
    }
];

const colors = [
    {
        label: 'Red',
        value: 'Red'
    },
    {
        label: 'Blue',
        value: 'Blue'
    },
    {
        label: 'Green',
        value: 'Green'
    }
];

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const TestFormInputSchema = z.object({
    text: z.string({
        invalid_type_error: 'Please input the text',
        required_error: 'Please input the text'
    })
        .min(1, 'Please input the text')
        .max(255, 'Cannot exceed 255 characters'),
    amount: z.number({
        invalid_type_error: 'Please input the amount',
        required_error: 'Please input the amount'
    })
        .int('Amount must be a number')
        .gte(1, 'Amount cannot be empty')
        .lte(1000, 'Amount cannot exceed 1000'),
    gender: z.enum(['male', 'female'], {
        required_error: 'Please pick a gender'
    }),
    rating: z.number({
        required_error: 'Please give a rating'
    })
        .gte(1, 'Please give a rating')
        .lte(5),
    food: z.string({
        required_error: 'Please select a food'
    }),
    color: z.string({
        required_error: 'Please tick your favorite colour(s)'
    }).array(),
    dob: z.instanceof(dayjs as unknown as typeof Dayjs)
        .refine((dobValue) => (dobValue.isAfter(dayjs("1990-01-01")) && dobValue.isBefore(dayjs()))
            , {
                message: "invalid date"
            }),
    img: z.any()
    .refine((uploaded) => uploaded?.fileList.length > 0 ,"Image is required")
    .refine((uploaded) => ACCEPTED_IMAGE_TYPES.includes(uploaded?.fileList[0].type), "Must be Image")
    .refine((uploaded) => uploaded?.fileList[0].size <= MAX_FILE_SIZE, "Image must not exceed 5MB")
        
});

type TestFormInput = z.infer<typeof TestFormInputSchema>;

const Sample: React.FC = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<TestFormInput>({
        resolver: zodResolver(TestFormInputSchema)
    });
    const onSubmit = (data: TestFormInput) => {
        alert(JSON.stringify(data));
    }

    return (

        <form
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="grid grid-cols-10 gap-2 items-center">
                <Controller
                    control={control}
                    name="text"
                    render={({ field }) => (
                        <>
                            <div className="row-span-2 col-span-2">
                                <label>Text</label>
                            </div>
                            <div className="col-span-8">
                                <Input {...field}
                                    placeholder="text placeholder"
                                    bordered />
                            </div>
                        </>
                    )}
                />
                <div className="col-span-8">
                    {errors.text && <span className="text-red-600">{errors.text.message}</span>}
                </div>

                <Controller
                    control={control}
                    name="amount"
                    render={({ field }) => (
                        <>
                            <div className="row-span-2 col-span-2">
                                <label>Amount</label>
                            </div>
                            <div className="col-span-8">
                                <InputNumber
                                    {...field}
                                    className="w-full"
                                    bordered />
                            </div>
                        </>
                    )}
                />
                <div className="col-span-8">
                    {errors.amount && <span className="text-red-600">{errors.amount.message}</span>}
                </div>

                <Controller
                    control={control}
                    name="gender"
                    render={({ field }) => (
                        <>
                            <div className="row-span-2 col-span-2">
                                <label>Gender</label>
                            </div>
                            <div className="col-span-8">
                                <Radio.Group
                                    {...field}
                                >
                                    <Radio value="male">Male</Radio>
                                    <Radio value="female">Female</Radio>
                                </Radio.Group>
                            </div>
                        </>
                    )}
                />
                <div className="col-span-8">
                    {errors.gender && <span className="text-red-600">{errors.gender.message}</span>}
                </div>

                <Controller
                    control={control}
                    name="rating"
                    render={({ field }) => (
                        <>
                            <div className="row-span-2 col-span-2">
                                <label>Rate</label>
                            </div>
                            <div className="col-span-8">
                                <Rate {...field} />
                            </div>
                        </>
                    )}
                />
                <div className="col-span-8">
                    {errors.rating && <span className="text-red-600">{errors.rating.message}</span>}
                </div>

                <Controller
                    control={control}
                    name="food"
                    render={({ field }) => (
                        <>
                            <div className="row-span-2 col-span-2">
                                <label>Food</label>
                            </div>
                            <div className="col-span-8">
                                <Select
                                    {...field}
                                    className="w-full"
                                    options={foods}
                                />
                            </div>
                        </>
                    )}
                />
                <div className="col-span-8">
                    {errors.food && <span className="text-red-600">{errors.food.message}</span>}
                </div>

                <Controller
                    control={control}
                    name="color"
                    render={({ field }) => (
                        <>
                            <div className="row-span-2 col-span-2">
                                <label>Favorite Color</label>
                            </div>
                            <div className="col-span-8">
                                <Checkbox.Group
                                    {...field}
                                    options={colors}
                                />
                            </div>
                        </>
                    )}
                />
                <div className="col-span-8">
                    {errors.color && <span className="text-red-600">{errors.color.message}</span>}
                </div>

                <Controller
                    control={control}
                    name="dob"
                    render={({ field }) => (
                        <>
                            <div className="row-span-2 col-span-2">
                                <label>Date of Birth</label>
                            </div>
                            <div className="col-span-8">
                                <DatePicker
                                    {...field}
                                    picker="date"
                                />
                            </div>
                        </>
                    )}
                />
                <div className="col-span-8">
                    {errors.dob && <span className="text-red-600">{errors.dob.message + " "}</span>}
                </div>
                <Controller
                    control={control}
                    name="img"
                    render={({ field }) => (
                        <>
                            <div className="col-span-10">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
                                <Upload 
                                    maxCount={1}
                                    {...field}
                                >
                                    <Button icon={<UploadOutlined />}>Click to Upload</Button>

                                </Upload>
                            </div>
                        </>
                    )}
                />
                <div className="col-span-10">
                    {errors.img && <span className="text-red-600">{errors.img.message + " "}</span>}
                </div>
                <div>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="bg-blue-600"
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </form>
    );
};

const TestPage: Page = () => {
    return (
        <>
            <Title>Sample Page</Title>
            <Sample></Sample>
        </>
    );
};

TestPage.layout = WithDefaultLayout;
export default TestPage;
