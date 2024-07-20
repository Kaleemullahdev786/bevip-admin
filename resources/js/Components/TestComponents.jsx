// rich text Editor //
<Controller
    name="anyName"
    control={control}
    render={({ field }) => (
        <RichTextEditor
            name={field.name}
            control={control}
            defaultValue={field.value}
        />
    )}
/>;
//
