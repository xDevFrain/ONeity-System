module.exports = async (client, interaction, args) => {
    try {
        // تأخير الرد لإعلام Discord بأن الرد سيتأخر
        await interaction.deferReply();

        const packageName = interaction.options.getString('name');

        // جلب بيانات الحزمة من npm API
        const response = await fetch(`https://registry.npmjs.org/${packageName}`);
        if (!response.ok) {
            return await interaction.editReply({
                content: "Package not found!"
            });
        }

        const data = await response.json();
        const latestVersion = data['dist-tags'].latest;
        const packageInfo = data.versions[latestVersion];

        // معالجة اسم المؤلف
        let author = 'Unknown';
        if (packageInfo.author) {
            if (typeof packageInfo.author === 'string') {
                author = packageInfo.author;
            } else if (packageInfo.author.name) {
                author = packageInfo.author.name;
            }
        }

        // جلب تاريخ آخر نشر
        const lastPublishTime = data.time && data.time[latestVersion] 
            ? `<t:${Math.round(new Date(data.time[latestVersion]).getTime() / 1000)}:F>` 
            : 'N/A';

        // جلب عدد التحميلات من npm API
        const downloadsResponse = await fetch(`https://api.npmjs.org/downloads/point/last-year/${packageName}`);
        if (!downloadsResponse.ok) {
            return await interaction.editReply({
                content: "Unable to fetch download statistics!"
            });
        }

        const downloadsData = await downloadsResponse.json();
        const downloadsCount = downloadsData.downloads ? downloadsData.downloads.toLocaleString() : 'N/A';

        const keywords = Array.isArray(packageInfo.keywords) && packageInfo.keywords.length > 0 
            ? packageInfo.keywords.join(', ') 
            : 'None';

        // إرسال الرد بعد اكتمال المعالجة
        await interaction.editReply({
            embeds: [{
                title: `📁・${packageInfo.name}`,
                fields: [
                    { name: "💬┇Name", value: packageInfo.name || 'N/A', inline: true },
                    { name: "🏷️┇Version", value: latestVersion || 'N/A', inline: true },
                    { name: "📃┇Description", value: packageInfo.description || 'No description available.', inline: true },
                    { name: "⌨️┇Keywords", value: keywords, inline: true },
                    { name: "💻┇Author", value: author, inline: true },
                    { name: "⏰┇Last Publish", value: lastPublishTime, inline: true },
                    { name: "📁┇Downloads (Last Year)", value: downloadsCount, inline: true },
                ]
            }]
        });
    } catch (error) {
        // التعامل مع أي أخطاء غير متوقعة
        await interaction.editReply({
            content: `An error occurred: ${error.message}`
        });
    }
}
