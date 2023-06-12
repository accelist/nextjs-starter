import { WithDefaultLayout } from "@/components/DefautLayout";
import { Title } from "@/components/Title";
import { Page } from "@/types/Page";
import { Button, Checkbox, DatePicker, Input, InputNumber, Radio, Rate, Select } from "antd";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs, { type Dayjs } from "dayjs";

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
        .gte(1, 'Amount cannot be empty'),
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
    dob: z.instanceof(dayjs as unknown as typeof Dayjs, {
        message: 'asd'
    })
});

type TestFormInput = z.infer<typeof TestFormInputSchema>;

const Test: React.FC = () => {
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
            <div className="grid grid-cols-2 gap-2 items-center">
                <Controller
                    control={control}
                    name="text"
                    render={({ field }) => (
                        <>
                            <div>
                                <label>Text</label>
                            </div>
                            <div>
                                <Input {...field}
                                    placeholder="text placeholder"
                                    bordered />
                            </div>
                        </>
                    )}
                />
                <div className="col-span-2">
                    {errors.text && <span className="text-red-600">{errors.text.message}</span>}
                </div>

                <Controller
                    control={control}
                    name="amount"
                    render={({ field }) => (
                        <>
                            <div>
                                <label>Amount</label>
                            </div>
                            <div>
                                <InputNumber
                                    {...field}
                                    className="w-full"
                                    bordered />
                            </div>
                        </>
                    )}
                />
                <div className="col-span-2">
                    {errors.amount && <span className="text-red-600">{errors.amount.message}</span>}
                </div>

                <Controller
                    control={control}
                    name="gender"
                    render={({ field }) => (
                        <>
                            <div>
                                <label>Gender</label>
                            </div>
                            <div>
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
                <div className="col-span-2">
                    {errors.gender && <span className="text-red-600">{errors.gender.message}</span>}
                </div>

                <Controller
                    control={control}
                    name="rating"
                    render={({ field }) => (
                        <>
                            <div>
                                <label>Rate</label>
                            </div>
                            <div>
                                <Rate {...field} />
                            </div>
                        </>
                    )}
                />
                <div className="col-span-2">
                    {errors.rating && <span className="text-red-600">{errors.rating.message}</span>}
                </div>

                <Controller
                    control={control}
                    name="food"
                    render={({ field }) => (
                        <>
                            <div>
                                <label>Food</label>
                            </div>
                            <div>
                                <Select
                                    {...field}
                                    className="w-full"
                                    options={foods}
                                />
                            </div>
                        </>
                    )}
                />
                <div className="col-span-2">
                    {errors.food && <span className="text-red-600">{errors.food.message}</span>}
                </div>

                <Controller
                    control={control}
                    name="color"
                    render={({ field }) => (
                        <>
                            <div>
                                <label>Favorite Color</label>
                            </div>
                            <div>
                                <Checkbox.Group
                                    {...field}
                                    options={colors}
                                />
                            </div>
                        </>
                    )}
                />
                <div className="col-span-2">
                    {errors.color && <span className="text-red-600">{errors.color.message}</span>}
                </div>

                <Controller
                    control={control}
                    name="dob"
                    render={({ field }) => (
                        <>
                            <div>
                                <label>Date of Birth</label>
                            </div>
                            <div>
                                <DatePicker
                                    {...field}
                                    picker="date"
                                />
                            </div>
                        </>
                    )}
                />
                <div className="col-span-2">
                    {errors.dob && <span className="text-red-600">{errors.dob.message}</span>}
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
            <Title>Test</Title>
            <Test></Test>
        </>
    );
};

TestPage.layout = WithDefaultLayout;
export default TestPage;
