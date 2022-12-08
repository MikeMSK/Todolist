describe('addItemForm', () => {
    it('base, visually looks correct', async () => {
        //  APIs from jest-puppeter
        await page.goto('http://localhost:6006//iframe.html?path=/story/additemform--add-item-form-base-example')
        const image = await page.screenshot();

        //  API from jest-image-snapshoot
        expect(image).toMatchImageSnapshot();
    });
})