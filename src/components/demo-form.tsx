import { useFieldArray, useWatch, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
	formDefaultValues,
	formSchema,
	type FormSchema,
} from '@/components/form-schema';
import { useEffect } from 'react';
import { CirclePlus, Trash } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export function DemoForm() {
	const { toast } = useToast();

	const form = useForm<FormSchema>({
		mode: 'all',
		resolver: zodResolver(formSchema),
		defaultValues: formDefaultValues,
	});

	const {
		fields: languagesFields,
		replace: replaceLanguages,
		append: appendLanguages,
		remove: removeLanguages,
	} = useFieldArray({
		control: form.control,
		name: 'languages',
	});

	// const fullErrors: FieldErrors<
	// 	Extract<FormSchema, { hasWorkExperience: true }>
	// > &
	// 	FieldErrors<Extract<FormSchema, { educationLevel: 'noFormalEducation' }>> &
	// 	FieldErrors<Extract<FormSchema, { educationLevel: 'highSchoolDiploma' }>> &
	// 	FieldErrors<Extract<FormSchema, { educationLevel: 'bachelorsDegree' }>> &
	// 	FieldErrors<Extract<FormSchema, { knowsOtherLanguages: true }>> = errors;

	const hasWorkExperience = useWatch({
		control: form.control,
		name: 'hasWorkExperience',
	});
	const knowsOtherLanguages = useWatch({
		control: form.control,
		name: 'knowsOtherLanguages',
	});
	const educationLevel = useWatch({
		control: form.control,
		name: 'educationLevel',
	});

	useEffect(() => {
		if (knowsOtherLanguages) {
			replaceLanguages([{ name: '' }]);
		}
	}, [knowsOtherLanguages, replaceLanguages]);

	function onSubmit(values: FormSchema) {
		toast({
			title: 'You submitted the following values:',
			description: (
				<pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
					<code className='text-white'>{JSON.stringify(values, null, 2)}</code>
				</pre>
			),
		});
	}

	return (
		<div className='w-full p-8 mx-24 my-8 space-y-4 border shadow-sm rounded-xl'>
			<h2 className='text-2xl font-bold'>React form</h2>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid grid-cols-3 gap-12 space-y-2'
				>
					<div>
						<FormField
							control={form.control}
							name='fullName'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Full name</FormLabel>
									<FormControl>
										<Input type='text' placeholder='John Doe' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='hasWorkExperience'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Has Work Experience?</FormLabel>
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
											className='block'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{hasWorkExperience && (
							<FormField
								control={form.control}
								name='companyName'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Company name</FormLabel>
										<FormControl>
											<Input type='text' placeholder='Walmart' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
					</div>

					<div>
						<FormField
							control={form.control}
							name='knowsOtherLanguages'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Knows Other Languages?</FormLabel>
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
											className='block'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{knowsOtherLanguages && (
							<>
								{languagesFields.map((field, index) => (
									<FormField
										key={field.id}
										control={form.control}
										name={`languages.${index}.name`}
										render={({ field: itemField }) => (
											<FormItem>
												<FormControl>
													<div className='flex gap-2'>
														<Input
															type='text'
															placeholder='Language'
															{...field}
															{...itemField}
															id={`languages.${index}.name`}
															name={`languages.${index}.name`}
														/>
														{/* <Input
														type='text'
														placeholder='Language'
														{...field}
													/> */}
														<Button
															disabled={languagesFields.length === 1}
															onClick={() => removeLanguages(index)}
															variant={'outline'}
														>
															<Trash className='w-4 h-4' />
														</Button>
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								))}
								<Button
									className='flex items-center gap-2'
									onClick={(e) => {
										e.preventDefault();
										appendLanguages({ name: '' });
									}}
									variant={'outline'}
									size={'sm'}
								>
									<CirclePlus className='w-4 h-4' />
									Add language
								</Button>
							</>
						)}
					</div>

					<div>
						<FormField
							control={form.control}
							name='educationLevel'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Educational Level</FormLabel>
									<FormControl>
										<RadioGroup
											onValueChange={field.onChange}
											defaultValue={field.value}
											className='flex flex-col space-y-1'
										>
											<FormItem className='flex items-center space-x-3 space-y-0'>
												<FormControl>
													<RadioGroupItem value='noFormalEducation' />
												</FormControl>
												<FormLabel className='font-normal'>
													No Formal Education
												</FormLabel>
											</FormItem>
											<FormItem className='flex items-center space-x-3 space-y-0'>
												<FormControl>
													<RadioGroupItem value='highSchoolDiploma' />
												</FormControl>
												<FormLabel className='font-normal'>
													High School Diploma
												</FormLabel>
											</FormItem>
											<FormItem className='flex items-center space-x-3 space-y-0'>
												<FormControl>
													<RadioGroupItem value='bachelorsDegree' />
												</FormControl>
												<FormLabel className='font-normal'>
													Bachelors Degree
												</FormLabel>
											</FormItem>
										</RadioGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{educationLevel === 'highSchoolDiploma' && (
							<FormField
								control={form.control}
								name='schoolName'
								render={({ field }) => (
									<FormItem>
										<FormLabel>School name</FormLabel>
										<FormControl>
											<Input type='text' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
						{educationLevel === 'bachelorsDegree' && (
							<FormField
								control={form.control}
								name='universityName'
								render={({ field }) => (
									<FormItem>
										<FormLabel>University name</FormLabel>
										<FormControl>
											<Input type='text' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
					</div>
					<div className='col-span-4 text-end'>
						<Button type='submit'>Submit values</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
